import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSummary, generateTags } from "@/lib/ai";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    let summary = undefined;
    let tags = undefined;

    if (body.content) {
      summary = await generateSummary(body.content);
      tags = await generateTags(body.content);
    }

    const updated = await prisma.knowledgeItem.update({
      where: { id: params.id },
      data: {
        ...body,
        summary,
        tags,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.knowledgeItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 400 }
    );
  }
}
