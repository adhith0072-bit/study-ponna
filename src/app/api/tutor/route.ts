import { NextRequest, NextResponse } from "next/server";
import { chatWithTutor } from "@/lib/ai/ai-tutor";

export async function POST(req: NextRequest) {
    try {
        const { messages, context } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        const response = await chatWithTutor(messages, context || "General study material");

        return NextResponse.json({
            message: response,
        });
    } catch (error: unknown) {
        console.error("[TUTOR_ERROR]", error);
        return NextResponse.json(
            { error: "Tutor unavailable" },
            { status: 500 }
        );
    }
}
