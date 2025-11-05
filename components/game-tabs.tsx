"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GameSection from "@/components/game-section"

const games = ["Valorant", "CS2", "Dota 2", "LoL", "PUBG"]

const mockTournaments = {
  Valorant: [
    {
      id: 1,
      name: "VCT Champions 2025",
      region: "Global",
      prizePool: "$2.25M",
      startDate: "Aug 2025",
      status: "Upcoming",
      link: "https://valorantesports.com",
    },
    {
      id: 2,
      name: "VCT Americas League",
      region: "Americas",
      prizePool: "$500K",
      startDate: "Mar 2025",
      status: "Ongoing",
      link: "https://valorantesports.com",
    },
  ],
  CS2: [
    {
      id: 3,
      name: "ESL Pro League Season 21",
      region: "Global",
      prizePool: "$1.05M",
      startDate: "Jan 2025",
      status: "Ongoing",
      link: "https://pro.eslgaming.com",
    },
    {
      id: 4,
      name: "BLAST Premier Spring Final",
      region: "Global",
      prizePool: "$1M",
      startDate: "Jun 2025",
      status: "Upcoming",
      link: "https://blast.tv",
    },
  ],
  "Dota 2": [
    {
      id: 5,
      name: "The International 2025",
      region: "Global",
      prizePool: "$2.6M+",
      startDate: "Jul 2025",
      status: "Registering",
      link: "https://www.dota2.com/international",
    },
    {
      id: 6,
      name: "DreamLeague Season 23",
      region: "Global",
      prizePool: "$1M",
      startDate: "Feb 2025",
      status: "Ongoing",
      link: "https://dreamhack.com",
    },
  ],
  LoL: [
    {
      id: 7,
      name: "MSI 2025",
      region: "Global",
      prizePool: "$500K",
      startDate: "May 2025",
      status: "Upcoming",
      link: "https://lolesports.com",
    },
    {
      id: 8,
      name: "LCK Spring 2025",
      region: "Korea",
      prizePool: "$300K",
      startDate: "Jan 2025",
      status: "Ongoing",
      link: "https://lolesports.com",
    },
  ],
  PUBG: [
    {
      id: 9,
      name: "PGS APAC Championship",
      region: "Asia-Pacific",
      prizePool: "$500K",
      startDate: "May 2025",
      status: "Upcoming",
      link: "https://pubgesports.com",
    },
    {
      id: 10,
      name: "PKL Season 3",
      region: "Global",
      prizePool: "$2M",
      startDate: "Mar 2025",
      status: "Ongoing",
      link: "https://pubgesports.com",
    },
  ],
}

export default function GameTabs() {
  return (
    <Tabs defaultValue="Valorant" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-slate-800 mb-8">
        {games.map((game) => (
          <TabsTrigger key={game} value={game} className="text-sm md:text-base">
            {game}
          </TabsTrigger>
        ))}
      </TabsList>

      {games.map((game) => (
        <TabsContent key={game} value={game} className="space-y-6">
          <GameSection game={game} tournaments={mockTournaments[game as keyof typeof mockTournaments]} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
