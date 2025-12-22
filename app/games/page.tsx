"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import NatureQuizGame from "@/components/quiz"
import { GamesGrid } from "@/components/games-grid"
import EcoMemoryGame from "@/components/eco-memory-game"
import CarbonTriviaGame from "@/components/carbon-trivia-game"
import GreenChoicesGame from "@/components/green-choices-game"
import EmissionRaceGame from "@/components/emission-race-game"
import PlanetBuilderGame from "@/components/planet-builder-game"

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 container mx-auto px-4 py-12">
        {selectedGame === null ? (
          <GamesGrid onSelectGame={setSelectedGame} />
        ) : selectedGame === "quiz" ? (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              ← Back to Games
            </button>
            <NatureQuizGame />
          </div>
        ) : selectedGame === "eco-memory" ? (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              ← Back to Games
            </button>
            <EcoMemoryGame />
          </div>
        ) : selectedGame === "carbon-trivia" ? (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              ← Back to Games
            </button>
            <CarbonTriviaGame />
          </div>
        ) : selectedGame === "green-choices" ? (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              ← Back to Games
            </button>
            <GreenChoicesGame />
          </div>
        ) : selectedGame === "emission-race" ? (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              ← Back to Games
            </button>
            <EmissionRaceGame />
          </div>
        ) : selectedGame === "planet-builder" ? (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              ← Back to Games
            </button>
            <PlanetBuilderGame />
          </div>
        ) : null}
      </div>
      <Footer />
    </main>
  )
}
