import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { answerQuestion, generateEmbedding } from "@/lib/ai";
import { cosineSimilarity } from "@/lib/vector";
import { z } from "zod";

const schema = z.object({ question: z.string().min(5) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    const questionEmbedding = await generateEmbedding(parsed.question);
    console.log("Question embedding length:", questionEmbedding.length);

    const allItems = await prisma.knowledgeItem.findMany({
      select: { id: true, title: true, content: true, embedding: true },
    });

    console.log("First item embedding length:", allItems[0]?.embedding?.length);

    if (!allItems.length) {
      return NextResponse.json({
        success: true,
        answer: "No knowledge items found in the system.",
        sources: [],
      });
    }

    const scoredItems = allItems
      .map((item) => ({
        ...item,
        score: cosineSimilarity(questionEmbedding, item.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const contextForAI = scoredItems.map((i) => ({
      id: i.id,
      title: i.title,
      content: i.content,
    }));

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
      { success: false, error: "Query failed" },
      { status: 400 }
    );
  }
}
