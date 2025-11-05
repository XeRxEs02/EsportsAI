"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import useSWR from "swr"
import { Search, RefreshCw, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import NewsCard from "@/components/news-card"
import StatCard from "@/components/stat-card"
import ChartTabs from "@/components/chart-tabs"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Test backend connectivity
  useEffect(() => {
    fetch('http://localhost:5000/api/ping')
      .then(res => res.json())
      .then(data => console.log('✅ Backend Response:', data))
      .catch(err => console.error('❌ Backend not reachable:', err));
  }, []);

  // Fetcher function for SWR
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  // Fetch news data with SWR - refresh every 60 seconds
  const { data: newsResponse, error, isLoading, mutate } = useSWR(
    'http://localhost:5000/api/news',
    fetcher,
    {
      refreshInterval: 60000, // 60 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  // Transform backend data to match NewsCard props
  const newsData = newsResponse?.news?.map((item: {
    id: number;
    title: string;
    description: string;
    source: string;
    publishedAt: string;
    url: string;
  }) => ({
    id: item.id,
    headline: item.title,
    summary: item.description,
    source: item.source,
    time: formatTimeAgo(item.publishedAt),
    url: item.url,
  })) || []

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await mutate() // Manually trigger revalidation
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Helper function to format time ago
  function formatTimeAgo(dateString: string) {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMs = now.getTime() - date.getTime()
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

      if (diffInHours < 1) return 'Just now'
      if (diffInHours === 1) return '1 hour ago'
      if (diffInHours < 24) return `${diffInHours} hours ago`

      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays === 1) return '1 day ago'
      if (diffInDays < 7) return `${diffInDays} days ago`

      return date.toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  // AI Analysis function
  const handleAIAnalysis = async () => {
    if (!newsData || newsData.length === 0) {
      alert('No news articles available for analysis. Please wait for news to load.');
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis(null);

    try {
      // Prepare articles data for AI analysis
      const articlesForAnalysis = newsResponse?.news?.map((article: any) => ({
        title: article.title || 'Untitled',
        description: article.description || 'No description available'
      })) || [];

      const response = await fetch('http://localhost:5000/api/ai-analyze-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articles: articlesForAnalysis }),
      });

      const data = await response.json();

      if (data.success) {
        setAiAnalysis(data.analysis);
      } else {
        setAiAnalysis(data.fallbackAnalysis || 'AI analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('AI Analysis error:', error);
      setAiAnalysis('## AI Analysis Error\n\nUnable to connect to AI analysis service. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stats = [
    { label: "Active Tournaments", value: 247, trend: 12, positive: true },
    { label: "Top Team", value: "FaZe Clan", trend: 8, positive: true },
    { label: "Popular Game", value: "Counter-Strike 2", trend: 15, positive: true },
    { label: "Avg Win Rate", value: "52.3%", trend: 3, positive: true },
  ]

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

            {/* Search Bar - Hidden on mobile, shown on md+ */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-4 lg:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm bg-slate-900 border-blue-500/30 focus:border-blue-500 w-full"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                size="sm"
                onClick={handleRefresh}
                className="h-8 px-2 sm:px-3 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
              >
                <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="ml-1.5 hidden sm:inline">Refresh</span>
              </Button>

              <Link href="/analyze">
                <Button size="sm" className="h-8 px-2 sm:px-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm">
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">AI</span>
                  </div>
                  <span className="ml-1.5 hidden sm:inline">AI Query</span>
                </Button>
              </Link>

              <Link href="/insights">
                <Button size="sm" className="h-8 px-2 sm:px-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm">
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">📊</span>
                  </div>
                  <span className="ml-1.5 hidden sm:inline">AI Insights</span>
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button size="sm" className="h-8 px-2 sm:px-3 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="ml-1.5 hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-screen-2xl">
        {/* Stats Grid */}
        <div className="mb-6 sm:mb-8 lg:mb-10 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Content Grid - Responsive layout */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
          {/* News Feed - Full width on mobile/tablet, 1/3 on desktop */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="h-full border-blue-900/30 bg-slate-900/50 backdrop-blur">
              <CardHeader className="border-b border-blue-900/20 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-400 text-sm sm:text-base lg:text-lg">Live News Feed</CardTitle>
                  <Button size="sm" variant="ghost" onClick={handleRefresh} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                    <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  </Button>
                </div>
                <CardDescription className="text-xs sm:text-sm">Real-time esports news</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 px-3 sm:px-4 max-h-96 lg:max-h-[600px] overflow-y-auto">
                {newsData.map((news: {
                  id: number;
                  headline: string;
                  summary: string;
                  source: string;
                  time: string;
                  url?: string;
                }) => (
                  <NewsCard key={news.id} {...news} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Charts - Full width on mobile/tablet, 2/3 on desktop */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <ChartTabs />
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <Card className="border-blue-900/30 bg-slate-900/50 backdrop-blur">
            <CardHeader className="border-b border-blue-900/20 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-blue-400 text-sm sm:text-base lg:text-lg">AI News Analysis</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Powered by GPT-4o-mini</CardDescription>
                </div>
                <Button
                  onClick={handleAIAnalysis}
                  disabled={isAnalyzing || !newsData.length}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm px-3 sm:px-4"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                      <span className="hidden sm:inline">Analyzing...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">AI Analyze News</span>
                      <span className="sm:hidden">AI</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {aiAnalysis ? (
                <div className="max-h-96 lg:max-h-[500px] overflow-y-auto">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div
                      className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: aiAnalysis.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>')
                          .replace(/^### (.*$)/gim, '<h3 class="text-blue-300 text-base sm:text-lg font-semibold mt-4 mb-2">$1</h3>')
                          .replace(/^## (.*$)/gim, '<h2 class="text-blue-200 text-lg sm:text-xl font-semibold mt-6 mb-3">$1</h2>')
                          .replace(/^# (.*$)/gim, '<h1 class="text-blue-100 text-xl sm:text-2xl font-bold mt-8 mb-4">$1</h1>')
                          .replace(/^(\d+\.)/gm, '<br/><strong class="text-blue-400">$1</strong>')
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 text-slate-400">
                  <Zap className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm sm:text-base px-4">
                    Click "AI Analyze News" to get AI-powered insights on current esports trends,
                    sentiment analysis, and market predictions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/30 bg-slate-950 py-4 sm:py-6 lg:py-8 mt-8 sm:mt-10 lg:mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm lg:text-base text-slate-400">
            Data powered by PandaScore, Liquipedia & NewsAPI
          </p>
        </div>
      </footer>
    </div>
  )
}
