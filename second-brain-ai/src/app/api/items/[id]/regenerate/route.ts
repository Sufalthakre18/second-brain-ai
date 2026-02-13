import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSummary, generateTags, generateEmbedding } from "@/lib/ai";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const item = await prisma.knowledgeItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    const summary = await generateSummary(item.content);
    const tags = await generateTags(item.content);
    const embedding = await generateEmbedding(item.content);

    const updated = await prisma.knowledgeItem.update({
      where: { id },
      data: {
        summary,
        tags,
        embedding,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to regenerate" },
      { status: 500 }
    );
  }
}
