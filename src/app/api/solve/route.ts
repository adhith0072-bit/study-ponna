import { NextRequest, NextResponse } from "next/server";
import { solveHomeworkProblem } from "@/lib/ai/ai-solver";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const mode = formData.get("mode") as string; // "text" or "image"
        const question = formData.get("question") as string;
        const imageFile = formData.get("image") as File | null;

        if (mode === "text" && !question?.trim()) {
            return NextResponse.json(
                { error: "Question text is required" },
                { status: 400 }
            );
        }

        let solution: string;

        if (mode === "image" && imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const base64 = buffer.toString("base64");
            solution = await solveHomeworkProblem(base64);
        } else {
            solution = await solveHomeworkProblem(undefined, question);
        }

        return NextResponse.json({
            solution,
        });
    } catch (error: unknown) {
        console.error("[SOLVE_ERROR]", error);
        return NextResponse.json(
            { error: "Solver unavailable" },
            { status: 500 }
        );
    }
}
