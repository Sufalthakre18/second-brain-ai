"use client";

import { useState } from "react";

type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
  type: "note" | "link" | "insight";
  tags: string[];
  summary: string | null;
  createdAt: string;
  updatedAt: string;
};

const typeIcons = {
  note: "📝",
  link: "🔗",
  insight: "💡",
};

const typeColors = {
  note: "from-blue-500/20 to-cyan-500/20 border-blue-500/50",
  link: "from-green-500/20 to-emerald-500/20 border-green-500/50",
  insight: "from-purple-500/20 to-pink-500/20 border-purple-500/50",
};

export default function KnowledgeCard({
  item,
  index,
  onDeleted,
}: {
  item: KnowledgeItem;
  index: number;
  onDeleted: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const res = await fetch(`/api/items/${item.id}/regenerate`, {
        method: "POST",
      });
      
      if (res.ok) {
        window.location.reload(); // Refresh to show new AI content
      }
    } catch (error) {
      console.error("Regeneration failed:", error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    setDeleting(true);
    try {
      // Note: You'll need to add a DELETE endpoint in your backend
      const res = await fetch(`/api/items/${item.id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        onDeleted(item.id);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`group relative p-6 bg-linear-to-br ${typeColors[item.type]} backdrop-blur-sm border rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl animate-fade-in`}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Type Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-slate-900/50 rounded-full text-sm font-medium text-white">
          {typeIcons[item.type]} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="p-2 bg-slate-900/50 rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50"
            title="Regenerate AI content"
          >
            {regenerating ? (
              <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24">
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
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{item.title}</h3>

      {/* Summary or Content */}
      <p className="text-slate-300 mb-4 line-clamp-3">
        {item.summary || item.content.substring(0, 150) + "..."}
      </p>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-900/30 rounded-md text-xs text-slate-300"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-slate-400">+{item.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
      >
        {expanded ? "Show Less" : "Read More"} →
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4 animate-slide-down">
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Full Content</h4>
            <p className="text-slate-300 whitespace-pre-wrap">{item.content}</p>
          </div>

          {item.summary && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-2">AI Summary</h4>
              <p className="text-slate-300 italic">{item.summary}</p>
            </div>
          )}

          {item.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-2">All Tags</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-900/50 rounded-full text-sm text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-slate-500">
            Created: {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 rounded-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
}