"use client";

import { useState, useEffect } from "react";

interface LandingSectionProps {
  onGetStarted: () => void;
}

export default function LandingSection({ onGetStarted }: LandingSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 1, height: 1 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted (prevents hydration mismatch issues)
    setMounted(true);

    // Set initial viewport size
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  // Prevent calculations during SSR
  const mouseX = mounted
    ? (mousePosition.x / viewport.width - 0.5) * 20
    : 0;

  const mouseY = mounted
    ? (mousePosition.y / viewport.height - 0.5) * 20
    : 0;

  return (
    <section className="relative bg-linear-to-br from-violet-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translate(${-mouseX}px, ${-mouseY}px)` }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Your{" "}
          <span className="bg-linear-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Second Brain
          </span>{" "}
          Powered by AI
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Capture ideas, organize knowledge, and unlock insights with intelligent
          summarization, auto-tagging, and conversational search.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-violet-600 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-xl transition-transform"
          >
            Get Started
          </button>

          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 sm:px-8 sm:py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white font-semibold hover:bg-slate-800 transition-all"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: "🧠",
    title: "Intelligent Capture",
    description:
      "Store notes, links, and insights with automatic AI summarization and tagging.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    description:
      "Find anything instantly with semantic search powered by vector embeddings.",
  },
  {
    icon: "💬",
    title: "AI Conversations",
    description:
      "Ask questions and get answers from your entire knowledge base using RAG.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative p-6 sm:p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:bg-slate-800/50 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300 pointer-events-none" />
    </div>
  );
}
