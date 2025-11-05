import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Tournament {
  id: number
  name: string
  region: string
  prizePool: string
  startDate: string
  status: string
  link: string
}

interface TeamData {
  rank: number
  team: string
  wins: number
  losses: number
  winRate: number
}

interface PerformanceData {
  week: string
  wins: number
  losses: number
}

interface GameData {
  performanceData: PerformanceData[]
  leaderboardData: TeamData[]
}

interface GameSectionProps {
  game: string
  tournaments: Tournament[]
}

const gameData = {
  Valorant: {
    performanceData: [
      { week: "W1", wins: 14, losses: 2 },
      { week: "W2", wins: 16, losses: 1 },
      { week: "W3", wins: 18, losses: 1 },
      { week: "W4", wins: 15, losses: 3 },
    ],
    leaderboardData: [
      { rank: 1, team: "Sentinels", wins: 62, losses: 8, winRate: 88.6 },
      { rank: 2, team: "Fnatic", wins: 58, losses: 12, winRate: 82.9 },
      { rank: 3, team: "Team Liquid", wins: 55, losses: 15, winRate: 78.6 },
      { rank: 4, team: "LOUD", wins: 52, losses: 18, winRate: 74.3 },
      { rank: 5, team: "Leviatán", wins: 48, losses: 22, winRate: 68.6 },
      { rank: 6, team: "KRÜ Esports", wins: 45, losses: 25, winRate: 64.3 },
      { rank: 7, team: "EDward Gaming", wins: 42, losses: 28, winRate: 60.0 },
      { rank: 8, team: "DRX", wins: 40, losses: 30, winRate: 57.1 },
      { rank: 9, team: "Paper Rex", wins: 38, losses: 32, winRate: 54.3 },
      { rank: 10, team: "Zeta Division", wins: 35, losses: 35, winRate: 50.0 },
    ]
  },
  CS2: {
    performanceData: [
      { week: "W1", wins: 12, losses: 3 },
      { week: "W2", wins: 15, losses: 2 },
      { week: "W3", wins: 18, losses: 2 },
      { week: "W4", wins: 16, losses: 4 },
    ],
    leaderboardData: [
      { rank: 1, team: "FaZe Clan", wins: 58, losses: 12, winRate: 82.9 },
      { rank: 2, team: "Natus Vincere", wins: 55, losses: 15, winRate: 78.6 },
      { rank: 3, team: "Vitality", wins: 52, losses: 18, winRate: 74.3 },
      { rank: 4, team: "G2 Esports", wins: 48, losses: 22, winRate: 68.6 },
      { rank: 5, team: "Cloud9", wins: 45, losses: 25, winRate: 64.3 },
      { rank: 6, team: "MOUZ", wins: 42, losses: 28, winRate: 60.0 },
      { rank: 7, team: "Astralis", wins: 40, losses: 30, winRate: 57.1 },
      { rank: 8, team: "ENCE", wins: 38, losses: 32, winRate: 54.3 },
      { rank: 9, team: "Heroic", wins: 35, losses: 35, winRate: 50.0 },
      { rank: 10, team: "FURIA", wins: 33, losses: 37, winRate: 47.1 },
    ]
  },
  "Dota 2": {
    performanceData: [
      { week: "W1", wins: 10, losses: 4 },
      { week: "W2", wins: 13, losses: 3 },
      { week: "W3", wins: 16, losses: 2 },
      { week: "W4", wins: 14, losses: 5 },
    ],
    leaderboardData: [
      { rank: 1, team: "Team Spirit", wins: 45, losses: 15, winRate: 75.0 },
      { rank: 2, team: "PSG.LGD", wins: 42, losses: 18, winRate: 70.0 },
      { rank: 3, team: "Gaimin Gladiators", wins: 40, losses: 20, winRate: 66.7 },
      { rank: 4, team: "BetBoom Team", wins: 38, losses: 22, winRate: 63.3 },
      { rank: 5, team: "Xtreme Gaming", wins: 35, losses: 25, winRate: 58.3 },
      { rank: 6, team: "Azure Ray", wins: 33, losses: 27, winRate: 55.0 },
      { rank: 7, team: "Talon Esports", wins: 30, losses: 30, winRate: 50.0 },
      { rank: 8, team: "Team Zero", wins: 28, losses: 32, winRate: 46.7 },
      { rank: 9, team: "LGD Gaming", wins: 25, losses: 35, winRate: 41.7 },
      { rank: 10, team: "Royal Never Give Up", wins: 22, losses: 38, winRate: 36.7 },
    ]
  },
  LoL: {
    performanceData: [
      { week: "W1", wins: 16, losses: 1 },
      { week: "W2", wins: 18, losses: 0 },
      { week: "W3", wins: 19, losses: 1 },
      { week: "W4", wins: 17, losses: 2 },
    ],
    leaderboardData: [
      { rank: 1, team: "T1", wins: 68, losses: 2, winRate: 97.1 },
      { rank: 2, team: "JD Gaming", wins: 62, losses: 8, winRate: 88.6 },
      { rank: 3, team: "Gen.G", wins: 58, losses: 12, winRate: 82.9 },
      { rank: 4, team: "BLG", wins: 55, losses: 15, winRate: 78.6 },
      { rank: 5, team: "Top Esports", wins: 52, losses: 18, winRate: 74.3 },
      { rank: 6, team: "Weibo Gaming", wins: 48, losses: 22, winRate: 68.6 },
      { rank: 7, team: "LNG Esports", wins: 45, losses: 25, winRate: 64.3 },
      { rank: 8, team: "KT Rolster", wins: 42, losses: 28, winRate: 60.0 },
      { rank: 9, team: "Dplus KIA", wins: 40, losses: 30, winRate: 57.1 },
      { rank: 10, team: "Hanwha Life", wins: 38, losses: 32, winRate: 54.3 },
    ]
  },
  PUBG: {
    performanceData: [
      { week: "W1", wins: 8, losses: 6 },
      { week: "W2", wins: 11, losses: 4 },
      { week: "W3", wins: 14, losses: 3 },
      { week: "W4", wins: 12, losses: 6 },
    ],
    leaderboardData: [
      { rank: 1, team: "Damwon Kia", wins: 42, losses: 18, winRate: 70.0 },
      { rank: 2, team: "Gen.G", wins: 40, losses: 20, winRate: 66.7 },
      { rank: 3, team: "T1", wins: 38, losses: 22, winRate: 63.3 },
      { rank: 4, team: "KT Rolster", wins: 35, losses: 25, winRate: 58.3 },
      { rank: 5, team: "Afreeca Freecs", wins: 33, losses: 27, winRate: 55.0 },
      { rank: 6, team: "Nongshim RedForce", wins: 30, losses: 30, winRate: 50.0 },
      { rank: 7, team: "DRX", wins: 28, losses: 32, winRate: 46.7 },
      { rank: 8, team: "Fredit BRION", wins: 25, losses: 35, winRate: 41.7 },
      { rank: 9, team: "SeolHaeOne Prince", wins: 22, losses: 38, winRate: 36.7 },
      { rank: 10, team: "EMT", wins: 20, losses: 40, winRate: 33.3 },
    ]
  }
}

export default function GameSection({ game, tournaments }: GameSectionProps) {
  const currentGameData = gameData[game as keyof typeof gameData];

  return (
    <div className="space-y-6">
      {/* Tournaments */}
      <Card className="border-blue-900/30 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-blue-400">Ongoing Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-4 hover:border-blue-500/40 transition-all"
              >
                <h3 className="font-semibold text-blue-300 mb-2">{tournament.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">Region</p>
                    <p>{tournament.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Prize Pool</p>
                    <p className="text-green-400 font-semibold">{tournament.prizePool}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Start Date</p>
                    <p>{tournament.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <p
                      className={
                        tournament.status === "Ongoing"
                          ? "text-yellow-400"
                          : tournament.status === "Registering"
                            ? "text-green-400"
                            : "text-slate-400"
                      }
                    >
                      {tournament.status}
                    </p>
                  </div>
                </div>
                <a href={tournament.link} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                    Register / View
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card className="border-blue-900/30 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-blue-400">Team Performance (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentGameData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #0ea5e9" }} />
              <Legend />
              <Bar dataKey="wins" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="losses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-blue-900/30 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-blue-400">Top 10 Teams by Win Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentGameData.leaderboardData.map((team: any) => (
              <div
                key={team.rank}
                className="flex items-center justify-between rounded-lg border border-blue-500/10 bg-slate-800/50 px-4 py-3 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-blue-400 min-w-8 text-center">#{team.rank}</span>
                  <span className="font-semibold text-slate-200">{team.team}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="text-slate-400">
                      {team.wins}W-{team.losses}L
                    </p>
                  </div>
                  <div className="text-right min-w-16">
                    <p className="font-bold text-green-400">{team.winRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
