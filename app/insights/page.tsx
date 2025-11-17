"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function InsightsPage() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/insights`, fetcher, {
    refreshInterval: 60000,
  });

  if (error) return <div className="text-red-500 p-6">Error loading insights.</div>;
  if (!data) return <div className="text-gray-400 p-6">Loading insights...</div>;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-900/30 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Insights Dashboard
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-4">
            EsportsAI Insights Dashboard
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto">
            Historical AI analysis of esports trends, sentiment, and market intelligence
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {data.insights.map((item: any) => (
            <div
              key={item._id}
              className="bg-slate-900/50 backdrop-blur border border-blue-900/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <p className="text-xs sm:text-sm text-blue-300 font-medium">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs font-medium self-start sm:self-auto">
                  AI Analysis
                </span>
              </div>
              <p className="font-semibold text-base sm:text-lg lg:text-xl mb-4 text-white">{item.query}</p>
              <div className="text-slate-200 whitespace-pre-wrap leading-relaxed text-sm sm:text-base max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto bg-slate-800/20 rounded-lg p-3 sm:p-4">
                {item.answer}
              </div>
            </div>
          ))}

          {data.insights.length === 0 && (
            <div className="text-center py-16 sm:py-24">
              <div className="text-4xl sm:text-6xl lg:text-8xl mb-6">📈</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-300 mb-4">No AI Analyses Yet</h3>
              <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-md mx-auto">
                Start asking questions on the AI Query page to see your analysis history here.
              </p>
              <Link href="/analyze">
                <Button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Try AI Analysis
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
