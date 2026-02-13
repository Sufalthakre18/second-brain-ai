"use client";

import { useState } from "react";

type FormData = {
  title: string;
  content: string;
  type: "note" | "link" | "insight";
};

export default function CreateItemForm({ onSuccess }: { onSuccess: (item: any) => void }) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    type: "note",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess(data.data);
        setFormData({ title: "", content: "", type: "note" });
      } else {
        setError(data.error || "Failed to create item");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Create Knowledge Item</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Title *</label>
          <input
            type="text"
            required
            minLength={3}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a descriptive title..."
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Type *</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "note", label: "📝 Note", desc: "General notes" },
              { value: "link", label: "🔗 Link", desc: "Web resources" },
              { value: "insight", label: "💡 Insight", desc: "Key learnings" },
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.value as any })}
                className={`p-4 border rounded-xl text-left transition-all ${
                  formData.type === type.value
                    ? "bg-violet-600/20 border-violet-500 text-white"
                    : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600"
                }`}
              >
                <div className="font-semibold mb-1">{type.label}</div>
                <div className="text-xs">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Content *</label>
          <textarea
            required
            minLength={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your thoughts, paste a link, or capture an insight..."
            rows={6}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none"
          />
          <p className="mt-2 text-sm text-slate-400">
            💡 AI will automatically generate a summary and tags for you
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-linear-to-r from-violet-600 to-purple-600 rounded-xl text-white font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-violet-500/50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing with AI...
            </span>
          ) : (
            "Create Item"
          )}
        </button>
      </div>
    </form>
  );
}