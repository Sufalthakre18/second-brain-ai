import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSummary, generateTags, generateEmbedding } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  type: z.enum(["note", "link", "insight"]),
});

// Type for items returned from Prisma
type KnowledgeItemType = {
  id: string;
  title: string;
  content: string;
  type: "note" | "link" | "insight";
  tags: string[];
  summary: string | null;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const type = searchParams.get("type");
    const tag = searchParams.get("tag");
    const sort = searchParams.get("sort") || "desc";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    // ✅ Explicitly type Prisma response
    const items: KnowledgeItemType[] = await prisma.knowledgeItem.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { content: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          type ? { type: type as any } : {},
          tag ? { tags: { has: tag.toLowerCase() } } : {},
        ],
      },
      orderBy: {
        createdAt: sort === "asc" ? "asc" : "desc",
      },
      skip,
      take: limit,
    });

    const total = await prisma.knowledgeItem.count();

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // ✅ Rate Limiting
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

    const body = await req.json();
    const parsed = schema.parse(body);

    // ✅ Generate AI metadata
    const summary: string = await generateSummary(parsed.content);
    const tags: string[] = await generateTags(parsed.content);
    const embedding: number[] = await generateEmbedding(parsed.content);

    // ✅ Create knowledge item
    const item: KnowledgeItemType = await prisma.knowledgeItem.create({
      data: {
        title: parsed.title,
        content: parsed.content,
        type: parsed.type,
        summary,
        tags,
        embedding,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: item,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to create item:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create item",
      },
      { status: 400 }
    );
  }
}
