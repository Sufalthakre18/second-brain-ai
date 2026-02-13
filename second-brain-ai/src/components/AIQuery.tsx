"use client";

import { useState } from "react";

type Source = {
  id: string;
  title: string;
  similarityScore: number;
};

export default function AIQuery() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.length < 5) return;

    setError("");
    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      if (data.success) {
        setAnswer(data.answer);
        setSources(data.sources || []);
      } else {
        setError(data.error || "Query failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-xs sm:text-sm mb-4">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            RAG-Powered Semantic Search
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Ask Your Second Brain
          </h1>
          <p className="text-sm sm:text-lg text-slate-400">
            Query your entire knowledge base using AI-powered semantic search
          </p>
        </div>

        {/* Query Form */}
        <form onSubmit={handleQuery} className="mb-8 animate-slide-up delay-100 relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about your notes, links, or insights..."
            rows={4}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none"
            required
            minLength={5}
          />

          {/* Submit Button */}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading || question.length < 5}
              className="px-6 py-3 bg-linear-to-r from-violet-600 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/50"
            >
              {loading ? "Searching..." : "Ask Question"}
            </button>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            💡 Uses vector embeddings + cosine similarity to find the most relevant information
          </p>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 animate-slide-down">
            {error}
          </div>
        )}

        {/* Answer */}
        {answer && (
          <div className="space-y-6 animate-slide-up">
            <div className="p-6 sm:p-8 bg-linear-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">🤖</span> AI Answer
              </h2>
              <p className="text-sm sm:text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
                {answer}
              </p>
            </div>

            {/* Sources */}
            {sources.length > 0 && (
              <div className="p-4 sm:p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                  📚 Sources (Top {sources.length})
                </h3>
                <div className="flex flex-col gap-3">
                  {sources.map((source, index) => (
                    <div
                      key={source.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <span className="flex items-center justify-center w-8 h-8 bg-violet-600 rounded-full text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-slate-200 text-sm sm:text-base">{source.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs sm:text-sm text-slate-400">
                          {(source.similarityScore * 100).toFixed(1)}% match
                        </div>
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-violet-500 to-purple-500"
                            style={{ width: `${source.similarityScore * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Example Questions */}
        {!answer && !loading && (
          <div className="animate-slide-up delay-200 mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Try asking:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "What are my main insights about AI?",
                "Summarize my notes on productivity",
                "What links have I saved about web development?",
                "Tell me about my recent learnings",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setQuestion(example)}
                  className="p-3 sm:p-4 bg-slate-800/30 border border-slate-700 rounded-xl text-left text-slate-300 hover:bg-slate-800/50 hover:border-violet-500/50 hover:text-white transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
