import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateFlashcards(sourceText: string, count: number = 20) {
    const result = await model.generateContent(
        `You are an expert educator. Given the following source material, generate ${count} high-quality flashcards.

Return ONLY valid JSON array with this format:
[{"front": "question", "back": "detailed answer"}]

Source Material:
${sourceText.substring(0, 8000)}`
    );

    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Failed to parse flashcards");
    return JSON.parse(jsonMatch[0]);
}

export async function generateQuiz(sourceText: string, count: number = 15) {
    const result = await model.generateContent(
        `You are an expert quiz maker. Given the following source material, generate ${count} quiz questions of mixed types.

Return ONLY valid JSON array with this format:
[{"type": "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK", "question": "...", "options": ["A. ...", "B. ..."] or ["True", "False"] or [], "answer": "correct answer letter or value", "explanation": "brief explanation"}]

Source Material:
${sourceText.substring(0, 8000)}`
    );

    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Failed to parse quiz");
    return JSON.parse(jsonMatch[0]);
}

export async function generateNotes(sourceText: string) {
    const result = await model.generateContent(
        `You are an expert study note creator. Given the following source material, create comprehensive, well-structured study notes in Markdown format.

Include:
- Clear headings and subheadings
- Key concepts bolded
- Bullet points for important facts
- A summary section at the end

Source Material:
${sourceText.substring(0, 8000)}`
    );

    return result.response.text();
}

export async function generateStudySet(sourceText: string, config?: { flashcardCount?: number; quizCount?: number }) {
    const [flashcards, quiz, notes] = await Promise.all([
        generateFlashcards(sourceText, config?.flashcardCount || 20),
        generateQuiz(sourceText, config?.quizCount || 15),
        generateNotes(sourceText),
    ]);

    return { flashcards, quiz, notes };
}
