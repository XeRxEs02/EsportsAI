import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface NewsCardProps {
  headline: string
  summary: string
  source: string
  time: string
  url?: string
}

export default function NewsCard({ headline, summary, source, time, url }: NewsCardProps) {
  const CardContent = () => (
    <div className="group cursor-pointer rounded-lg border border-blue-500/20 bg-slate-800/50 p-3 sm:p-4 transition-all hover:border-blue-500/50 hover:bg-slate-800">
      <h3 className="mb-2 line-clamp-2 font-semibold text-blue-300 group-hover:text-blue-200 text-sm sm:text-base">{headline}</h3>
      <p className="mb-3 line-clamp-2 text-xs sm:text-sm text-slate-400">{summary}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="truncate max-w-[60%] sm:max-w-none">{source}</span>
        <span className="flex items-center gap-1 flex-shrink-0">
          <span className="hidden sm:inline">{time}</span>
          <span className="sm:hidden">•</span>
          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100" />
        </span>
      </div>
    </div>
  )

  if (url && url !== '#') {
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}
