import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generatePodcastScript(
    sourceText: string,
    topic: string
) {
    const result = await model.generateContent(
        `Create an engaging, conversational podcast script about "${topic}" based on the following source material. The podcast should be educational but entertaining, like two hosts discussing the topic.

Format it with:
- HOST 1: (lines)
- HOST 2: (lines)

Make it about 5 minutes of speaking content. Include fun analogies and real-world examples.

Source Material:
${sourceText.substring(0, 6000)}`
    );

    return result.response.text();
}
