import { NextRequest, NextResponse } from "next/server";
import { parseContent } from "@/lib/parsers/content-parser";
import { generateStudySet } from "@/lib/ai/generate-study-set";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SourceType, QuizType } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!(session?.user as any)?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await req.formData();

        const sourceTypeString = formData.get("sourceType") as string;
        const title = formData.get("title") as string;
        const subject = formData.get("subject") as string;
        const flashcardCount = Number(formData.get("flashcardCount") || 20);

        // Map string to Enum (Default to TEXT if unknown, or handle error)
        const sourceType = SourceType[sourceTypeString as keyof typeof SourceType] || SourceType.TEXT;


        if (!sourceTypeString || !title) {
            return NextResponse.json(
                { error: "Source type and title are required" },
                { status: 400 }
            );
        }

        // Step 1: Parse the content
        let sourceText = "";

        if (sourceTypeString === "PDF" || sourceTypeString === "AUDIO") {
            const file = formData.get("file") as File;
            if (!file) {
                return NextResponse.json(
                    { error: "File is required for this source type" },
                    { status: 400 }
                );
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            sourceText = await parseContent(sourceTypeString, {
                buffer,
                filename: file.name,
            });
        } else if (sourceTypeString === "TEXT") {
            sourceText = await parseContent(sourceTypeString, {
                text: formData.get("text") as string,
            });
        } else if (sourceTypeString === "YOUTUBE" || sourceTypeString === "LINK") {
            sourceText = await parseContent(sourceTypeString, {
                url: formData.get("url") as string,
            });
        } else if (sourceTypeString === "IMAGE") {
            const file = formData.get("file") as File;
            if (!file) {
                return NextResponse.json(
                    { error: "Image is required" },
                    { status: 400 }
                );
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = buffer.toString("base64");
            sourceText = await parseContent(sourceTypeString, { base64 });
        }

        if (!sourceText.trim()) {
            return NextResponse.json(
                { error: "Could not extract content from the provided source" },
                { status: 400 }
            );
        }

        // Step 2: Generate study materials using AI
        const studyMaterials = await generateStudySet(sourceText, {
            flashcardCount,
        });

        // Step 3: Save to database using Prisma
        const studySet = await prisma.studySet.create({
            data: {
                userId: (session?.user as any).id,
                title,
                subject,
                sourceType,
                sourceText: sourceText.substring(0, 10000), // Limit text storage
                flashcards: {
                    create: studyMaterials.flashcards.map((card: any, index: number) => ({
                        front: card.front,
                        back: card.back,
                        position: index,
                    })),
                },
                quizzes: {
                    create: studyMaterials.quiz.map((q: any, index: number) => ({
                        type: (QuizType[q.type as keyof typeof QuizType] || QuizType.MULTIPLE_CHOICE),
                        question: q.question,
                        options: q.options || [],
                        answer: q.answer,
                        explanation: q.explanation || "",
                        position: index,
                    })),
                },
                notes: {
                    create: {
                        content: studyMaterials.notes || "",
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            studySet,
        });
    } catch (error: unknown) {
        console.error("[CREATE_STUDY_SET_ERROR]", error);
        return NextResponse.json(
            { error: "Failed to create study set" },
            { status: 500 }
        );
    }
}
