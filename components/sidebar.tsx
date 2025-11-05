"use client"

import Link from "next/link"
import { Home, BarChart3, Trophy, Sparkles, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Trophy, label: "Tournaments", href: "#" },
    { icon: Sparkles, label: "AI Insights", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 border-r border-blue-900/30 bg-slate-950 transition-transform duration-300 md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-blue-900/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-400">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={onClose}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-blue-900/20 p-4">
            <p className="text-xs text-slate-500">EsportsAI v1.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}
