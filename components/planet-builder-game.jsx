"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function PlanetBuilderGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [year, setYear] = useState(2025)
  const [budget, setBudget] = useState(1000)
  const [gameOver, setGameOver] = useState(false)

  const [resources, setResources] = useState({
    energy: 50,
    water: 50,
    food: 50,
    population: 100,
    happiness: 50,
    emissions: 100,
  })

  const [infrastructure, setInfrastructure] = useState({
    solar: 0,
    wind: 0,
    nuclear: 0,
    forests: 0,
    recycling: 0,
    publicTransit: 0,
  })

  const startGame = () => {
    setGameStarted(true)
    setYear(2025)
    setBudget(1000)
    setGameOver(false)
    setResources({
      energy: 50,
      water: 50,
      food: 50,
      population: 100,
      happiness: 50,
      emissions: 100,
    })
    setInfrastructure({
      solar: 0,
      wind: 0,
      nuclear: 0,
      forests: 0,
      recycling: 0,
      publicTransit: 0,
    })
  }

  const investments = [
    {
      name: "Solar Farms",
      key: "solar",
      cost: 100,
      icon: "☀️",
      effect: { energy: 15, emissions: -10 },
    },
    {
      name: "Wind Turbines",
      key: "wind",
      cost: 80,
      icon: "💨",
      effect: { energy: 12, emissions: -8 },
    },
    {
      name: "Nuclear Plant",
      key: "nuclear",
      cost: 200,
      icon: "⚛️",
      effect: { energy: 30, emissions: -15 },
    },
    {
      name: "Reforestation",
      key: "forests",
      cost: 60,
      icon: "🌳",
      effect: { emissions: -20, happiness: 5 },
    },
    {
      name: "Recycling Center",
      key: "recycling",
      cost: 70,
      icon: "♻️",
      effect: { emissions: -12, happiness: 3 },
    },
    {
      name: "Public Transit",
      key: "publicTransit",
      cost: 120,
      icon: "🚇",
      effect: { emissions: -15, happiness: 8 },
    },
  ]

  const invest = (investment) => {
    if (budget >= investment.cost && infrastructure[investment.key] < 10) {
      setBudget(budget - investment.cost)
      setInfrastructure({
        ...infrastructure,
        [investment.key]: infrastructure[investment.key] + 1,
      })

      setResources({
        ...resources,
        energy: Math.min(100, resources.energy + (investment.effect.energy || 0)),
        emissions: Math.max(0, resources.emissions + (investment.effect.emissions || 0)),
        happiness: Math.min(100, resources.happiness + (investment.effect.happiness || 0)),
      })
    }
  }

  const nextYear = () => {
    if (year >= 2050) {
      setGameOver(true)
      return
    }

    // Calculate changes
    const populationGrowth = resources.happiness > 60 ? 5 : resources.happiness > 40 ? 2 : -2
    const emissionChange =
      (infrastructure.solar + infrastructure.wind + infrastructure.nuclear) * -2 +
      (infrastructure.forests + infrastructure.recycling) * -1
    const happinessChange = resources.energy > 60 && resources.food > 60 ? 5 : -5

    setYear(year + 1)
    setBudget(budget + 200)
    setResources({
      ...resources,
      population: Math.max(0, resources.population + populationGrowth),
      emissions: Math.max(0, Math.min(100, resources.emissions + emissionChange + 3)),
      happiness: Math.max(0, Math.min(100, resources.happiness + happinessChange)),
    })

    // Check game over conditions
    if (resources.emissions >= 100 || resources.happiness <= 0 || resources.population <= 0) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
  }

  if (gameOver) {
    const finalScore = Math.round(
      (100 - resources.emissions) * 0.4 +
        resources.happiness * 0.3 +
        resources.population * 0.3 +
        Object.values(infrastructure).reduce((a, b) => a + b, 0) * 2,
    )

    return (
      <Card className="max-w-4xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{finalScore >= 500 ? "🌍" : finalScore >= 300 ? "🌱" : "💔"}</div>
            <h2 className="text-3xl font-bold text-foreground">{year >= 2050 ? "Mission Complete!" : "Game Over"}</h2>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-primary">{finalScore}</p>
              <p className="text-xl text-muted-foreground">Final Score</p>
            </div>
            <p className="text-lg text-muted-foreground">
              {finalScore >= 500 && "Outstanding! You built a sustainable paradise! 🌟"}
              {finalScore >= 300 && finalScore < 500 && "Good effort! Your planet is on the right track! 🌱"}
              {finalScore < 300 && "Your planet needs more sustainable policies! 🌍"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Final Year</p>
              <p className="text-2xl font-bold">{year}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Population</p>
              <p className="text-2xl font-bold">{resources.population}M</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Emissions</p>
              <p className="text-2xl font-bold">{resources.emissions}%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Happiness</p>
              <p className="text-2xl font-bold">{resources.happiness}%</p>
            </div>
          </div>

          <Button onClick={resetGame} size="lg" className="w-full">
            Build Another Planet
          </Button>
        </div>
      </Card>
    )
  }

  if (!gameStarted) {
    return (
      <Card className="max-w-3xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="text-6xl">🌏</div>
          <h2 className="text-3xl font-bold text-foreground">Planet Builder</h2>
          <p className="text-lg text-muted-foreground">Build and manage a sustainable planet from 2025 to 2050!</p>
          <div className="space-y-3 text-left max-w-md mx-auto bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold">Your Mission:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Manage resources wisely</li>
              <li>✓ Reduce carbon emissions below 50%</li>
              <li>✓ Keep population happy and growing</li>
              <li>✓ Invest in renewable energy and sustainability</li>
              <li>✓ Survive until 2050 with a thriving planet!</li>
            </ul>
          </div>
          <Button onClick={startGame} size="lg" className="mt-6">
            Start Building
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">Year</p>
            <p className="text-2xl font-bold text-primary">{year}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="text-2xl font-bold text-green-600">${budget}B</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">Population</p>
            <p className="text-2xl font-bold">{resources.population}M</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">Emissions</p>
            <p
              className={`text-2xl font-bold ${
                resources.emissions < 50
                  ? "text-green-600"
                  : resources.emissions < 75
                    ? "text-orange-600"
                    : "text-red-600"
              }`}
            >
              {resources.emissions}%
            </p>
          </div>
        </Card>
      </div>

      {/* Resource Meters */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Planet Status</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Energy Supply</span>
              <span className="font-semibold">{resources.energy}%</span>
            </div>
            <Progress value={resources.energy} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Happiness</span>
              <span className="font-semibold">{resources.happiness}%</span>
            </div>
            <Progress value={resources.happiness} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Carbon Emissions</span>
              <span className="font-semibold">{resources.emissions}%</span>
            </div>
            <Progress value={resources.emissions} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Investments */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Investments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investments.map((investment) => (
            <button
              key={investment.key}
              onClick={() => invest(investment)}
              disabled={budget < investment.cost || infrastructure[investment.key] >= 10}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                budget >= investment.cost && infrastructure[investment.key] < 10
                  ? "border-border hover:border-primary hover:bg-primary/5"
                  : "border-border opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{investment.icon}</span>
                  <span className="text-xs font-semibold text-green-600">${investment.cost}B</span>
                </div>
                <p className="font-medium text-sm">{investment.name}</p>
                <div className="flex items-center gap-2">
                  <Progress value={infrastructure[investment.key] * 10} className="h-1 flex-1" />
                  <span className="text-xs text-muted-foreground">{infrastructure[investment.key]}/10</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Next Year Button */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Ready to progress?</h3>
            <p className="text-sm text-muted-foreground">Advance to year {year + 1}</p>
          </div>
          <Button onClick={nextYear} size="lg">
            Next Year →
          </Button>
        </div>
      </Card>
    </div>
  )
}
