import { NextRequest, NextResponse } from "next/server";
import { parseContent } from "@/lib/parsers/content-parser";
import { generateStudySet } from "@/lib/ai/generate-study-set";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const sourceType = formData.get("sourceType") as string;
        const title = formData.get("title") as string;
        const subject = formData.get("subject") as string;
        const flashcardCount = Number(formData.get("flashcardCount") || 20);


        if (!sourceType || !title) {
            return NextResponse.json(
                { error: "Source type and title are required" },
                { status: 400 }
            );
        }

        // Step 1: Parse the content
        let sourceText = "";

        if (sourceType === "PDF" || sourceType === "AUDIO") {
            const file = formData.get("file") as File;
            if (!file) {
                return NextResponse.json(
                    { error: "File is required for this source type" },
                    { status: 400 }
                );
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            sourceText = await parseContent(sourceType, {
                buffer,
                filename: file.name,
            });
        } else if (sourceType === "TEXT") {
            sourceText = await parseContent(sourceType, {
                text: formData.get("text") as string,
            });
        } else if (sourceType === "YOUTUBE" || sourceType === "LINK") {
            sourceText = await parseContent(sourceType, {
                url: formData.get("url") as string,
            });
        } else if (sourceType === "IMAGE") {
            const file = formData.get("file") as File;
            if (!file) {
                return NextResponse.json(
                    { error: "Image is required" },
                    { status: 400 }
                );
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = buffer.toString("base64");
            sourceText = await parseContent(sourceType, { base64 });
        }

        if (!sourceText.trim()) {
            return NextResponse.json(
                { error: "Could not extract content from the provided source" },
                { status: 400 }
            );
        }

        // Step 2: Generate study materials using AI
        // Step 2: Generate study materials using AI
        const studyMaterials = await generateStudySet(sourceText, {
            flashcardCount,
        });

        // Step 3: Save to database (placeholder — using Prisma in production)
        // In production, this would save to the database using Prisma
        const studySet = {
            id: crypto.randomUUID(),
            title,
            subject,
            sourceType,
            sourceText: sourceText.substring(0, 5000),
            flashcards: studyMaterials.flashcards,
            quiz: studyMaterials.quiz,
            notes: studyMaterials.notes,
            createdAt: new Date().toISOString(),
        };

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
