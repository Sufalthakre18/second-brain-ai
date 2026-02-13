import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { answerQuestion } from "@/lib/ai";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const question = searchParams.get("q");

    if (!question) {
      return NextResponse.json({ success: false, error: "Missing question" }, { status: 400 });
    }

    const items = await prisma.knowledgeItem.findMany({ take: 10, orderBy: { createdAt: "desc" } });
    const answer = await answerQuestion(question, items);

    return NextResponse.json({ success: true, answer });
  } catch (error) {
    console.error("Public query failed:", error);
    return NextResponse.json({ success: false, error: "Public query failed" }, { status: 500 });
  }
}
