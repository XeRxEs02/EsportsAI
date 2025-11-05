"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const winRateData = [
  { name: "FaZe Clan", winRate: 68 },
  { name: "Team Liquid", winRate: 65 },
  { name: "Vitality", winRate: 62 },
  { name: "Cloud9", winRate: 58 },
  { name: "G2", winRate: 55 },
]

const tournamentData = [
  { name: "Valorant", value: 45 },
  { name: "Counter-Strike 2", value: 32 },
  { name: "Dota 2", value: 28 },
  { name: "League of Legends", value: 22 },
  { name: "Others", value: 18 },
]

const viewershipData = [
  { day: "Day 1", viewers: 2400 },
  { day: "Day 5", viewers: 2210 },
  { day: "Day 10", viewers: 2290 },
  { day: "Day 15", viewers: 2000 },
  { day: "Day 20", viewers: 2181 },
  { day: "Day 25", viewers: 2500 },
  { day: "Day 30", viewers: 2100 },
]

const COLORS = ["#3b82f6", "#0ea5e9", "#06b6d4", "#10b981", "#f59e0b"]

export default function ChartTabs() {
  return (
    <Card className="border-blue-900/30 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-blue-400 text-sm sm:text-base lg:text-lg">Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="winrate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 h-8 sm:h-10">
            <TabsTrigger value="winrate" className="text-xs sm:text-sm">Win Rates</TabsTrigger>
            <TabsTrigger value="tournaments" className="text-xs sm:text-sm">Tournaments</TabsTrigger>
            <TabsTrigger value="viewership" className="text-xs sm:text-sm">Viewership</TabsTrigger>
          </TabsList>

          <TabsContent value="winrate" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={winRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #0ea5e9" }}
                  labelStyle={{ color: "#0ea5e9" }}
                />
                <Bar dataKey="winRate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="tournaments" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tournamentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tournamentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #0ea5e9" }} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="viewership" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewershipData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #0ea5e9" }}
                  labelStyle={{ color: "#0ea5e9" }}
                />
                <Line
                  type="monotone"
                  dataKey="viewers"
                  stroke="#3b82f6"
                  dot={{ fill: "#3b82f6" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
