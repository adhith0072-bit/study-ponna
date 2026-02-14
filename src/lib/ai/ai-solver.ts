import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function solveHomeworkProblem(
    imageBase64?: string,
    textQuestion?: string
) {
    if (imageBase64) {
        // Use Gemini Vision for image-based problems
        const visionModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await visionModel.generateContent([
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: imageBase64,
                },
            },
            {
                text: "Solve this problem step by step. Show your complete work clearly. Format your response with numbered steps. If it's a math problem, show all calculations.",
            },
        ]);

        return result.response.text();
    }

    if (textQuestion) {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(
            `Solve the following problem step by step. Show your complete work clearly. Format your response with numbered steps.

Problem: ${textQuestion}`
        );

        return result.response.text();
    }

    throw new Error("Either imageBase64 or textQuestion must be provided");
}
