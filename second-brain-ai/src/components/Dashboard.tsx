"use client";

import { useState, useEffect } from "react";
import CreateItemForm from "./CreateItemForm";
import KnowledgeCard from "./KnowledgeCard";
import SkeletonLoader from "./SkeletonLoader";

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

export default function Dashboard() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems();
  }, [search, typeFilter, tagFilter, sortOrder, page]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        sort: sortOrder,
        ...(search && { search }),
        ...(typeFilter && { type: typeFilter }),
        ...(tagFilter && { tag: tagFilter }),
      });

      const res = await fetch(`/api/items?${params}`);
      const data = await res.json();

      if (data.success) {
        setItems(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemCreated = (newItem: KnowledgeItem) => {
    setItems([newItem, ...items]);
    setShowForm(false);
  };

  const handleItemDeleted = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Get unique tags from all items
  const allTags = Array.from(new Set(items.flatMap((item) => item.tags)));

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-4">Knowledge Dashboard</h1>
          <p className="text-xl text-slate-400">
            Manage and explore your personal knowledge base
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4 animate-slide-up delay-100">
          {/* Search & Create Button */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search your knowledge..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-4 bg-linear-to-r from-violet-600 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-all hover:shadow-xl hover:shadow-violet-500/50 whitespace-nowrap"
            >
              {showForm ? "Cancel" : "+ New Item"}
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-violet-500 outline-none transition-all cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="note">📝 Notes</option>
              <option value="link">🔗 Links</option>
              <option value="insight">💡 Insights</option>
            </select>

            <select
              value={tagFilter}
              onChange={(e) => {
                setTagFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-violet-500 outline-none transition-all cursor-pointer"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-violet-500 outline-none transition-all cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            {(search || typeFilter || tagFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setTypeFilter("");
                  setTagFilter("");
                  setPage(1);
                }}
                className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="mb-8 animate-slide-down">
            <CreateItemForm onSuccess={handleItemCreated} />
          </div>
        )}

        {/* Items Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold text-white mb-2">No knowledge items yet</h3>
            <p className="text-slate-400 mb-6">
              Start building your second brain by creating your first item
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-violet-600 rounded-lg text-white font-semibold hover:bg-violet-700 transition-all"
            >
              Create First Item
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <KnowledgeCard
                  key={item.id}
                  item={item}
                  index={index}
                  onDeleted={handleItemDeleted}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        page === i + 1
                          ? "bg-violet-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}