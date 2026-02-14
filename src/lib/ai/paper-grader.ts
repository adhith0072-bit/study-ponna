import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function gradeEssay(
    essayText: string,
    rubric: string,
    maxScore: number
) {
    const result = await model.generateContent(
        `You are an expert essay grader. Grade the following essay based on the rubric provided.

Return ONLY valid JSON with this format:
{"score": number, "maxScore": ${maxScore}, "feedback": "overall feedback", "strengths": ["strength1", "strength2"], "improvements": ["area1", "area2"], "rubricScores": [{"category": "name", "score": number, "maxScore": number, "comment": "feedback"}]}

Rubric:
${rubric}

Essay:
${essayText.substring(0, 6000)}`
    );

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse grading result");
    return JSON.parse(jsonMatch[0]);
}
