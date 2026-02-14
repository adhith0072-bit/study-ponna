import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function chatWithTutor(
    messages: { role: "user" | "assistant"; content: string }[],
    studySetContext: string
) {
    // Convert message history to Gemini format
    const history = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
        history: history.slice(0, -1) as { role: "user" | "model"; parts: { text: string }[] }[],
        systemInstruction: `You are a friendly, expert AI tutor helping a student study. Use the Socratic method — guide them to answers through questions rather than just giving direct answers. Use analogies and the Feynman Technique to simplify complex concepts.

Study material context:
${studySetContext.substring(0, 4000)}`,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    return result.response.text();
}
