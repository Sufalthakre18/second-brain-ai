"use client";

import { useState } from "react";
import LandingSection from "@/components/LandingSection";
import Dashboard from "@/components/Dashboard";
import AIQuery from "@/components/AIQuery";
import PublicWidget from "@/components/PublicWidget";

export default function Home() {
  const [activeView, setActiveView] = useState<
    "landing" | "dashboard" | "query" | "widget"
  >("landing");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", value: "landing" },
    { label: "Dashboard", value: "dashboard" },
    { label: "AI Query", value: "query" },
    { label: "Public API", value: "widget" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold">
                Second Brain
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveView(item.value as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeView === item.value
                      ? "bg-violet-600 text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 space-y-2 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActiveView(item.value as any);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeView === item.value
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        {activeView === "landing" && (
          <LandingSection
            onGetStarted={() => setActiveView("dashboard")}
          />
        )}
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "query" && <AIQuery />}
        {activeView === "widget" && <PublicWidget />}
      </main>
    </div>
  );
}
