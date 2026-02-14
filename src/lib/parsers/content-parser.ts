/**
 * Content Parsers — Extract text from various source types.
 * These are server-side utilities for the API routes.
 */

// PDF Parser using pdf-parse
export async function parsePdf(buffer: Buffer): Promise<string> {
    // Dynamic import — pdf-parse doesn't have proper ESM/TS types
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdf = require("pdf-parse");
    const data = await pdf(buffer);
    return data.text;
}

// YouTube Transcript Extractor — fetches transcript from YouTube video
export async function parseYouTubeTranscript(url: string): Promise<string> {
    // Extract video ID from URL
    const videoId = extractYouTubeId(url);
    if (!videoId) throw new Error("Invalid YouTube URL");

    // In production, use a library like youtube-transcript or youtube-captions-scraper
    // For now, we'll use a simple fetch approach
    try {
        const response = await fetch(
            `https://www.youtube.com/watch?v=${videoId}`
        );
        const html = await response.text();

        // Extract captions data from page source
        const captionTrackMatch = html.match(/"captionTracks":\[.*?\]/);
        if (!captionTrackMatch) {
            return `[YouTube video: ${videoId} — transcript not available. Please paste content manually.]`;
        }

        // Parse caption track URL
        const tracksJson = JSON.parse(`{${captionTrackMatch[0]}}`);
        const track = tracksJson.captionTracks[0];
        if (!track?.baseUrl) {
            return `[YouTube video: ${videoId} — no captions found.]`;
        }

        // Fetch the actual transcript
        const transcriptResponse = await fetch(track.baseUrl);
        const transcriptXml = await transcriptResponse.text();

        // Parse XML to extract text
        const textSegments: string[] = transcriptXml.match(/<text[^>]*>[\s\S]*?<\/text>/g) ?? [];
        const transcript = textSegments
            .map((seg: string) => seg.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"'))
            .join(" ");

        return transcript || `[Transcript extraction failed for video ${videoId}]`;
    } catch {
        return `[Could not extract transcript from YouTube video: ${videoId}]`;
    }
}

// URL Content Scraper — extracts readable text from a web page
export async function parseWebPage(url: string): Promise<string> {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "StudyPonna-Bot/1.0",
            },
        });
        const html = await response.text();

        // Basic HTML to text conversion
        // In production, use cheerio or readability library
        const text = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
            .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
            .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
            .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
            .replace(/<[^>]+>/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .replace(/\s{2,}/g, " ")
            .trim();

        return text.substring(0, 10000); // Cap at 10k chars
    } catch {
        throw new Error(`Failed to fetch content from ${url}`);
    }
}

// Image OCR — uses Gemini Vision to extract text from images
export async function parseImage(base64Data: string): Promise<string> {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64Data,
            },
        },
        {
            text: "Extract ALL text from this image. Preserve formatting (tables, lists, headers). If it contains a math problem, write it clearly. Return ONLY the extracted text.",
        },
    ]);

    return result.response.text();
}

// Audio Transcription — uses Gemini for audio understanding
export async function parseAudio(buffer: Buffer, filename: string): Promise<string> {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Convert buffer to base64 for Gemini
    const base64Audio = buffer.toString("base64");
    const mimeType = filename.endsWith(".mp3") ? "audio/mpeg" : filename.endsWith(".wav") ? "audio/wav" : "audio/mpeg";

    const result = await model.generateContent([
        {
            inlineData: {
                mimeType: mimeType,
                data: base64Audio,
            },
        },
        {
            text: "Transcribe this audio completely. Return ONLY the transcription text, nothing else.",
        },
    ]);

    return result.response.text();
}

// Helper: Extract YouTube Video ID from URL
function extractYouTubeId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Universal parser that routes to the correct parser based on source type.
 */
export async function parseContent(
    sourceType: string,
    data: {
        buffer?: Buffer;
        text?: string;
        url?: string;
        base64?: string;
        filename?: string;
    }
): Promise<string> {
    switch (sourceType) {
        case "PDF":
            if (!data.buffer) throw new Error("PDF buffer required");
            return parsePdf(data.buffer);

        case "YOUTUBE":
            if (!data.url) throw new Error("YouTube URL required");
            return parseYouTubeTranscript(data.url);

        case "LINK":
            if (!data.url) throw new Error("URL required");
            return parseWebPage(data.url);

        case "IMAGE":
            if (!data.base64) throw new Error("Image base64 required");
            return parseImage(data.base64);

        case "AUDIO":
            if (!data.buffer || !data.filename) throw new Error("Audio buffer and filename required");
            return parseAudio(data.buffer, data.filename);

        case "TEXT":
            if (!data.text) throw new Error("Text content required");
            return data.text;

        default:
            throw new Error(`Unsupported source type: ${sourceType}`);
    }
}
