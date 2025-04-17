// app/api/ask/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { question } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Adjusted prompt to get only confidence score
  const prompt = `Given the following market:\n\n${question}\n\nShould we trade? Provide only the confidence score (0–100) without an answer like "yes" or "no".`;

  try {
    console.log("🧠 Sending to Gemini...");
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim(); // Get response text

    console.log("📦 Gemini raw response:", raw); // Check the raw response

    // Attempt to parse the confidence score
    const confidence = parseFloat(raw);
    if (isNaN(confidence)) {
      throw new Error("Invalid confidence score");
    }

    return new Response(JSON.stringify({ confidence }), { status: 200 });
  } catch (e) {
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
