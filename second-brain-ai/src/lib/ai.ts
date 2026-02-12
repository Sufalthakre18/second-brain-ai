import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

/* ======================================================
   INITIALIZE GEMINI
====================================================== */

let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("⚠️ GEMINI_API_KEY not found. AI features disabled.");
}

/* ======================================================
   TEXT GENERATION MODEL
====================================================== */

function getTextModel() {
  if (!genAI) return null;

  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
}

/* ======================================================
   EMBEDDING MODEL
====================================================== */

function getEmbeddingModel() {
  if (!genAI) return null;

  return genAI.getGenerativeModel({
    model: "embedding-001",
  });
}

/* ======================================================
   GENERATE SUMMARY
====================================================== */

export async function generateSummary(content: string): Promise<string> {
  const model = getTextModel();
  if (!model) return "";

  try {
    const result = await model.generateContent(`
Summarize the following content in 3 concise professional sentences:

${content}
`);

    return result.response.text().trim();
  } catch (error: any) {
    console.error("Summary AI error:", error?.response?.data || error);
    return "";
  }
}

/* ======================================================
   GENERATE TAGS
====================================================== */

export async function generateTags(content: string): Promise<string[]> {
  const model = getTextModel();
  if (!model) return [];

  try {
    const result = await model.generateContent(`
Generate exactly 5 relevant single-word tags.
Return strictly comma-separated values only.

${content}
`);

    const text = result.response.text();

    return text
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 5);
  } catch (error: any) {
    console.error("Tag AI error:", error?.response?.data || error);
    return [];
  }
}

/* ======================================================
   ANSWER QUESTION USING CONTEXT
====================================================== */

type AIContextItem = {
  id: string;
  title: string;
  content: string;
};

export async function answerQuestion(
  question: string,
  context: AIContextItem[]
): Promise<string> {
  const model = getTextModel();
  if (!model) return "AI service unavailable.";

  try {
    const combinedContext = context
      .map((item) => `Title: ${item.title}\nContent: ${item.content}`)
      .join("\n\n");

    const result = await model.generateContent(`
You are an intelligent knowledge assistant.

Answer strictly using the knowledge base below.
If the answer is not found, say:
"Information not found in knowledge base."

Knowledge Base:
${combinedContext}

Question:
${question}
`);

    return result.response.text().trim();
  } catch (error: any) {
    console.error("Query AI error FULL:", error?.response?.data || error);
    return "Unable to process question right now.";
  }
}

/* ======================================================
   GENERATE EMBEDDING (FIXED VERSION)
====================================================== */

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = getEmbeddingModel();
  if (!model) return [];

  try {
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error: any) {
    console.error("Embedding error FULL:", error?.response?.data || error);
    return [];
  }
}
