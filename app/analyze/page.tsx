"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EsportsAIDashboard() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call backend AI endpoint
  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.answer);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (err) {
      setResponse("Failed to connect to backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-900/30 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500 flex-shrink-0" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                EsportsAI
              </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/">
                <Button size="sm" className="h-8 px-2 sm:px-3 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                  <span className="hidden sm:inline">← Back to Dashboard</span>
                  <span className="sm:hidden">←</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-4">
            EsportsAI Intelligence
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto">
            Ask about esports trends, players, or tournaments — powered by AI
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-blue-900/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          <div className="space-y-6">
            <textarea
              className="w-full p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-blue-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-none"
              rows={6}
              placeholder="e.g. Analyze the current Valorant esports scene, or ask about player performance trends..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold transition text-sm sm:text-base ${
                loading
                  ? "bg-slate-600 cursor-not-allowed text-slate-400"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  Analyzing your query...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">🤖</span>
                  Analyze with AI
                </div>
              )}
            </button>

            {response && (
              <div className="mt-8">
                <div className="bg-slate-800/30 border border-blue-500/20 rounded-xl p-4 sm:p-6">
                  <h3 className="text-blue-400 font-semibold mb-4 text-sm sm:text-base">AI Response:</h3>
                  <div className="text-slate-200 whitespace-pre-wrap leading-relaxed text-sm sm:text-base max-h-96 lg:max-h-[600px] overflow-y-auto">
                    {response}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
