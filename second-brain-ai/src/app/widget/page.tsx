"use client";

import { useState } from "react";

export default function WidgetPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`/api/public/brain/query?q=${encodeURIComponent(question)}`);
      const data = await res.json();

      if (data.success) {
        setAnswer(data.answer);
      } else {
        setAnswer("Unable to find an answer in the knowledge base.");
      }
    } catch (err) {
      setAnswer("Error connecting to the knowledge base.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SB</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Second Brain</h1>
          </div>
          <p className="text-slate-400">Ask anything about our knowledge base</p>
        </div>

        {/* Query Form */}
        <form onSubmit={handleQuery} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading || !question}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-linear-to-r from-violet-600 to-purple-600 rounded-lg text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>
        </form>

        {/* Answer */}
        {answer && (
          <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">Answer:</h3>
            <p className="text-white leading-relaxed">{answer}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full" />
          </div>
        )}

        {/* Powered By */}
        <div className="mt-8 text-center text-sm text-slate-500">
          Powered by Second Brain AI
        </div>
      </div>
    </div>
  );
}