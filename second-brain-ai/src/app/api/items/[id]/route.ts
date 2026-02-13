import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSummary, generateTags, generateEmbedding } from "@/lib/ai";

// ✅ PATCH - update item
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    let summary, tags;
    if (body.content) {
      summary = await generateSummary(body.content);
      tags = await generateTags(body.content);
    }

    const updated = await prisma.knowledgeItem.update({
      where: { id },
      data: { ...body, summary, tags },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PATCH failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Update failed" },
      { status: 400 }
    );
  }
}

// ✅ DELETE - delete item
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.knowledgeItem.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.error("DELETE failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Delete failed" },
      { status: 400 }
    );
  }
}

// ✅ POST - regenerate summary/tags/embedding
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const item = await prisma.knowledgeItem.findUnique({ where: { id } });
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
      data: { summary, tags, embedding },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Regenerate failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to regenerate" },
      { status: 500 }
    );
  }
}
