import OpenAI from "openai";

/* ======================================================
   INITIALIZE GROQ
====================================================== */

const groqApiKey = process.env.GROQ_API_KEY;

let client: OpenAI | null = null;

if (groqApiKey) {
  client = new OpenAI({
    apiKey: groqApiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
} else {
  console.warn("⚠️ GROQ_API_KEY not found.");
}

const TEXT_MODEL = "llama-3.3-70b-versatile";

/* ======================================================
   SUMMARY
====================================================== */

export async function generateSummary(content: string): Promise<string> {
  if (!client) return "";

  try {
    const completion = await client.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a professional summarization assistant.",
        },
        {
          role: "user",
          content: `Summarize the following content in 3 concise professional sentences:\n\n${content}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error: any) {
    console.error("Summary AI error:", error?.message || error);
    return "";
  }
}

/* ======================================================
   TAGS
====================================================== */

export async function generateTags(content: string): Promise<string[]> {
  if (!client) return [];

  try {
    const completion = await client.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Generate exactly 5 relevant single-word tags separated by commas only. No explanations.",
        },
        {
          role: "user",
          content: content.substring(0, 500),
        },
      ],
      temperature: 0.3,
      max_tokens: 50,
    });

    const text = completion.choices[0]?.message?.content || "";

    return text
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 5);
  } catch (error: any) {
    console.error("Tag AI error:", error?.message || error);
    return [];
  }
}

/* ======================================================
   ANSWER QUESTION (RAG)
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
  if (!client) return "AI unavailable.";

  try {
    const limitedContext = context
      .slice(0, 3)
      .map(
        (item) =>
          `Title: ${item.title}\nContent: ${item.content.substring(0, 500)}`
      )
      .join("\n\n");

    const completion = await client.chat.completions.create({
      model: TEXT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Answer using ONLY the provided knowledge base. If not found, say: 'Information not found in knowledge base.'",
        },
        {
          role: "user",
          content: `Knowledge Base:\n${limitedContext}\n\nQuestion:\n${question}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 300,
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error: any) {
    console.error("Answer AI error:", error?.message || error);
    return "Unable to generate answer.";
  }
}

/* ======================================================
   EMBEDDINGS - IMPROVED FALLBACK (NO EXTERNAL API)
====================================================== */

export async function generateEmbedding(text: string): Promise<number[]> {
  // Clean and prepare text
  const cleanText = text.toLowerCase().trim();
  const words = cleanText.split(/\s+/).slice(0, 100); // First 100 words
  const chars = cleanText.substring(0, 500); // First 500 chars
  
  const vector: number[] = [];
  const targetDim = 384; // Standard embedding dimension

  // Generate embedding using multiple techniques for better quality
  for (let i = 0; i < targetDim; i++) {
    let value = 0;
    
    // Technique 1: Word-based features
    words.forEach((word, wordIdx) => {
      const wordHash = word.split('').reduce(
        (hash, char) => hash + char.charCodeAt(0),
        0
      );
      value += Math.sin(wordHash * (i + 1) + wordIdx * 0.1) / words.length;
    });
    
    // Technique 2: Character n-grams
    for (let j = 0; j < chars.length - 2; j++) {
      const trigram = chars.substring(j, j + 3);
      const trigramHash = trigram.split('').reduce(
        (hash, char) => hash + char.charCodeAt(0),
        0
      );
      value += Math.cos(trigramHash * (i + 1)) / chars.length;
    }
    
    // Technique 3: Position-weighted features
    const positionWeight = Math.sin(i / targetDim * Math.PI);
    value *= (1 + positionWeight * 0.1);
    
    vector.push(value);
  }

  // Normalize the vector
  return normalize(vector);
}

/* ======================================================
   NORMALIZE VECTOR
====================================================== */

function normalize(vector: number[]): number[] {
  const magnitude = Math.sqrt(
    vector.reduce((sum, val) => sum + val * val, 0)
  );

  return magnitude > 0 
    ? vector.map((val) => val / magnitude)
    : vector;
}