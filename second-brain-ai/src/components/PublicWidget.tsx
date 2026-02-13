"use client";

import { useState } from "react";

export default function PublicWidget() {
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = typeof window !== "undefined" ? window.location.origin : "";
  const widgetUrl = `${apiUrl}/widget`;
  const apiEndpoint = `${apiUrl}/api/public/brain/query`;

  const embedCode = `<iframe 
  src="${widgetUrl}" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`;

  const curlExample = `curl -X GET "${apiEndpoint}?q=your+question+here"`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTest = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`/api/public/brain/query?q=${encodeURIComponent(question)}`);
      const data = await res.json();

      if (data.success) {
        setAnswer(data.answer);
      }
    } catch (err) {
      setAnswer("Error fetching answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Public Infrastructure
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Public API Access</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Expose your Second Brain's intelligence to the world via REST API or embeddable widget
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Documentation */}
          <div className="space-y-6 animate-slide-up delay-100">
            <div className="p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">🔌</span>
                REST API Endpoint
              </h2>
              <p className="text-slate-400 mb-6">
                Query your knowledge base programmatically from any application
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    GET Endpoint
                  </label>
                  <div className="relative">
                    <code className="block p-4 bg-slate-900 rounded-lg text-green-400 text-sm overflow-x-auto">
                      {apiEndpoint}
                    </code>
                    <button
                      onClick={() => handleCopy(apiEndpoint)}
                      className="absolute top-2 right-2 px-3 py-1 bg-slate-800 rounded text-xs text-white hover:bg-slate-700 transition-all"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Query Parameter
                  </label>
                  <code className="block p-4 bg-slate-900 rounded-lg text-slate-300 text-sm">
                    ?q=your+question+here
                  </code>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    cURL Example
                  </label>
                  <div className="relative">
                    <code className="block p-4 bg-slate-900 rounded-lg text-slate-300 text-sm overflow-x-auto">
                      {curlExample}
                    </code>
                    <button
                      onClick={() => handleCopy(curlExample)}
                      className="absolute top-2 right-2 px-3 py-1 bg-slate-800 rounded text-xs text-white hover:bg-slate-700 transition-all"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Response Format
                  </label>
                  <code className="block p-4 bg-slate-900 rounded-lg text-slate-300 text-sm">
                    {`{
  "success": true,
  "answer": "AI-generated answer..."
}`}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Embeddable Widget */}
          <div className="space-y-6 animate-slide-up delay-200">
            <div className="p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">🖼️</span>
                Embeddable Widget
              </h2>
              <p className="text-slate-400 mb-6">
                Add your Second Brain to any website with a simple iframe
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Widget URL
                  </label>
                  <div className="relative">
                    <code className="block p-4 bg-slate-900 rounded-lg text-green-400 text-sm overflow-x-auto">
                      {widgetUrl}
                    </code>
                    <button
                      onClick={() => handleCopy(widgetUrl)}
                      className="absolute top-2 right-2 px-3 py-1 bg-slate-800 rounded text-xs text-white hover:bg-slate-700 transition-all"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Embed Code
                  </label>
                  <div className="relative">
                    <code className="block p-4 bg-slate-900 rounded-lg text-slate-300 text-xs overflow-x-auto whitespace-pre">
                      {embedCode}
                    </code>
                    <button
                      onClick={() => handleCopy(embedCode)}
                      className="absolute top-2 right-2 px-3 py-1 bg-slate-800 rounded text-xs text-white hover:bg-slate-700 transition-all"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <a
                  href="/widget"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-violet-600 rounded-lg text-white font-semibold text-center hover:bg-violet-700 transition-all"
                >
                  Open Widget in New Tab →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* API Tester */}
        <div className="mt-8 p-8 bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl animate-slide-up delay-300">
          <h2 className="text-2xl font-bold text-white mb-4">🧪 Test the API</h2>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a question to test the public API..."
              className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
            />
            <button
              onClick={handleTest}
              disabled={loading || !question}
              className="px-8 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Testing..." : "Test"}
            </button>
          </div>

          {answer && (
            <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
              <h3 className="text-sm font-semibold text-slate-400 mb-2">Response:</h3>
              <p className="text-white">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}