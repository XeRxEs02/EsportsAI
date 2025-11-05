import { Zap, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/30 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-blue-400">Dashboard</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
