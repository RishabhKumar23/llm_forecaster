import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { question } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `User asked: \"${question}\"\nRespond with:\n- answer (Likely/Unlikely/Yes/No/etc)\n- confidence (0–100)\n- explanation (2–3 lines)\nReturn JSON.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    const data = JSON.parse(response);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "Failed to parse Gemini response",
        raw: response,
      }),
      { status: 500 }
    );
  }
}
