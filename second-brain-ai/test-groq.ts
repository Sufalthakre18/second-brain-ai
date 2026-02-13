import dotenv from "dotenv";
dotenv.config();

async function test() {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: "Say hello in one sentence." }
      ]
    })
  });

  const data = await response.json();
  console.log(data);
}

test();
