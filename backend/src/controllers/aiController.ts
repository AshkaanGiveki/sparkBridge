import { Request, Response } from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /ai/summary
 * Body: { description: string, reviews: string[] }
 */

export async function generateProductSummary(req: Request, res: Response) {
  const { description, reviews } = req.body;

  if (!description || !Array.isArray(reviews)) {
    return res.status(400).json({ error: "Invalid input. Provide description and reviews[]" });
  }

  const prompt = `
You are an assistant that writes product summaries for an e-commerce website.

Please generate the following, based on the product description and real user reviews provided:

1. **Product Summary**: A short, engaging paragraph that describes the product’s core features and appeal. Avoid technical jargon unless essential.
2. **Positive Points**: A bulleted list of strengths or highlights mentioned in the reviews.
3. **Negative Points**: A bulleted list of drawbacks, complaints, or areas of improvement based on the reviews.
4. **Overall Purchase Experience**: Write a brief paragraph (2–3 sentences) summarizing what buying and using this product feels like based on customer feedback.

### Product Description:
${description}

### User Reviews:
${reviews.map((r, i) => `Review ${i + 1}: "${r}"`).join("\n")}
`;
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 700,
    });

    const summary = chat.choices[0]?.message?.content?.trim();

    return res.json({ summary });
  } catch (error: any) {
    console.error("AI summary error:", error);

    // Fallback summary if in development
    if (process.env.NODE_ENV !== "production") {
      return res.json({
        summary: "این محصول از دید کاربران کیفیت و عملکرد قابل قبولی دارد و ارزش خرید بالایی دارد.",
      });
    }

    return res.status(500).json({ error: "AI summary generation failed." });
  }
}
