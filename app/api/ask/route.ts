// app/api/ask/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { question } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Structured prompt for cleaner parsing
  const prompt = `You are an expert prediction market analyst. Given the market description below:

"${question}"

Answer with:
Confidence Score (0–100): <number only>
Reason: <brief justification>`;

  try {
    console.log("🧠 Sending to Gemini...");
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    console.log("📦 Gemini raw response:", raw);

    // Extract confidence score and reason using regex
    const scoreMatch = raw.match(/Confidence Score.*?(\d{1,3})/i);
    const reasonMatch = raw.match(/Reason: (.*)/i);

    if (!scoreMatch) {
      throw new Error("Could not find a confidence score in the response");
    }

    const confidence = parseFloat(scoreMatch[1]);
    const reason = reasonMatch ? reasonMatch[1].trim() : "No reason provided";

    return new Response(JSON.stringify({ confidence, reason }), {
      status: 200,
    });
  } catch (e: any) {
    console.error("❌ Gemini failed:", e);
    return new Response(
      JSON.stringify({
        error: "Failed to get a valid response from Gemini",
        details: e.message,
      }),
      { status: 500 }
    );
  }
}
