"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface StatCardProps {
  label: string
  value: string | number
  trend: number
  positive: boolean
}

export default function StatCard({ label, value, trend, positive }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (typeof value === "string") return
    let current = 0
    const target = value as number
    const increment = target / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setDisplayValue(target)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [value])

  return (
    <div className="group rounded-lg border border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-blue-950/30 p-4 sm:p-6 backdrop-blur transition-all hover:border-blue-500/40 hover:from-slate-900/80 hover:to-blue-950/50">
      <p className="mb-2 text-xs sm:text-sm font-medium text-slate-400">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-300">{typeof value === "string" ? value : displayValue}</h3>
        </div>
        <div
          className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${positive ? "text-green-400" : "text-red-400"}`}
        >
          {positive ? <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
          {trend}%
        </div>
      </div>
    </div>
  )
}
