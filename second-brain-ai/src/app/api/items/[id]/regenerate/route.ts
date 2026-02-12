import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSummary, generateTags } from "@/lib/ai";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.knowledgeItem.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    const summary = await generateSummary(item.content);
    const tags = await generateTags(item.content);

    const updated = await prisma.knowledgeItem.update({
      where: { id: params.id },
      data: { summary, tags },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Regeneration failed" },
      { status: 500 }
    );
  }
}
