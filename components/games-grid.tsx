"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Game {
  id: string
  title: string
  description: string
  icon: string
  difficulty: string
  players: string
}

const games: Game[] = [
  {
    id: "quiz",
    title: "Nature Explorer Quiz",
    description:
      "Test your knowledge about climate and nature with 5 engaging questions. Learn fun facts about the environment while playing!",
    icon: "🌍",
    difficulty: "Easy",
    players: "1 Player",
  },
  {
    id: "carbon-trivia",
    title: "Carbon Trivia Challenge",
    description:
      "Challenge yourself with trivia questions about carbon emissions, renewable energy, and sustainability practices.",
    icon: "🌱",
    difficulty: "Medium",
    players: "1 Player",
  },
  {
    id: "eco-memory",
    title: "Eco Memory Game",
    description:
      "Match pairs of climate and environmental concepts. A classic memory game with an eco-conscious twist!",
    icon: "🧠",
    difficulty: "Easy",
    players: "1 Player",
  },
  {
    id: "green-choices",
    title: "Green Choices",
    description:
      "Make sustainable choices in real-world scenarios and see how your decisions impact the environment and carbon footprint.",
    icon: "♻️",
    difficulty: "Medium",
    players: "1 Player",
  },
  {
    id: "emission-race",
    title: "Emission Race",
    description:
      "Race against the clock to reduce carbon emissions by making the right environmental choices. How low can you go?",
    icon: "⚡",
    difficulty: "Hard",
    players: "1 Player",
  },
  {
    id: "planet-builder",
    title: "Planet Builder",
    description:
      "Build and manage a sustainable planet. Make choices about energy, resources, and environmental policies.",
    icon: "🌏",
    difficulty: "Hard",
    players: "1 Player",
  },
]

export function GamesGrid({ onSelectGame }: { onSelectGame: (gameId: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Climate Games Hub</h1>
        <p className="text-lg text-muted-foreground">
          Learn about sustainability and carbon emissions while having fun! Choose a game to play.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1 flex flex-col bg-background hover:bg-muted/50 transition">
              {/* Icon and Title */}
              <div className="mb-4">
                <div className="text-5xl mb-3">{game.icon}</div>
                <h2 className="text-xl font-bold text-foreground">{game.title}</h2>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-1">{game.description}</p>

              {/* Metadata */}
              <div className="flex gap-2 mb-4 text-xs">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">{game.difficulty}</span>
                <span className="px-2 py-1 rounded-full bg-secondary/10 text-secondary-foreground">{game.players}</span>
              </div>

              {/* Play Button */}
              <Button
                onClick={() => onSelectGame(game.id)}
                className="w-full bg-primary text-primary-foreground hover:opacity-90"
              >
                Play Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="mt-12 p-8 rounded-lg bg-muted/50 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">More Games Coming Soon!</h3>
        <p className="text-muted-foreground">
          We're developing new educational games to make learning about climate change even more fun and engaging.
        </p>
      </div>
    </div>
  )
}
