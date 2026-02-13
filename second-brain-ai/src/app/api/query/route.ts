import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { answerQuestion, generateEmbedding } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rate-limit";
import { cosineSimilarity } from "@/lib/vector";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    // ✅ Rate Limit
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    // ✅ Validate input
    const body = await req.json();
    const parsed = schema.parse(body);

    // ✅ Generate embedding for question
    const questionEmbedding = await generateEmbedding(parsed.question);

    // ✅ Fetch all stored knowledge embeddings
    const allItems = await prisma.knowledgeItem.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        embedding: true,
      },
    });

    if (!allItems.length) {
      return NextResponse.json({
        success: true,
        answer: "No knowledge items found in the system.",
        sources: [],
      });
    }

    // ✅ Score items using cosine similarity - FIXED TYPE
    const scoredItems = allItems
      .map((item: { id: string; title: string; content: string; embedding: number[] }) => ({
        ...item,
        score: cosineSimilarity(questionEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // top 5 most relevant

    // ✅ Prepare context for AI
    const contextForAI = scoredItems.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
    }));

    // ✅ Generate final AI answer
    const answer = await answerQuestion(parsed.question, contextForAI);

    return NextResponse.json({
      success: true,
      answer,
      sources: scoredItems.map((i) => ({
        id: i.id,
        title: i.title,
        similarityScore: i.score,
      })),
    });
  } catch (error) {
    console.error("Query failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Query failed",
      },
      { status: 400 }
    );
  }
}