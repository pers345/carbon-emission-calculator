"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function EmissionRaceGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [emissions, setEmissions] = useState(1000)
  const [actions, setActions] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const actionOptions = [
    { name: "Install Solar Panels", reduction: 150, time: 3 },
    { name: "Switch to LED Bulbs", reduction: 50, time: 1 },
    { name: "Plant Trees", reduction: 80, time: 2 },
    { name: "Use Public Transport", reduction: 60, time: 1 },
    { name: "Install Insulation", reduction: 100, time: 2 },
    { name: "Buy Electric Vehicle", reduction: 200, time: 4 },
    { name: "Reduce Meat Consumption", reduction: 70, time: 1 },
    { name: "Start Composting", reduction: 40, time: 1 },
    { name: "Use Renewable Energy", reduction: 180, time: 3 },
    { name: "Energy Efficient Appliances", reduction: 90, time: 2 },
  ]

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true)
            setGameStarted(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameStarted, timeLeft, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(60)
    setEmissions(1000)
    setActions([])
    setGameOver(false)
  }

  const takeAction = (action) => {
    if (timeLeft >= action.time) {
      setTimeLeft((prev) => prev - action.time)
      setEmissions((prev) => Math.max(0, prev - action.reduction))
      setActions((prev) => [...prev, action])
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setTimeLeft(60)
    setEmissions(1000)
    setActions([])
    setGameOver(false)
  }

  if (gameOver) {
    const reductionPercent = Math.round(((1000 - emissions) / 1000) * 100)
    return (
      <Card className="max-w-3xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {reductionPercent >= 80 ? "🏆" : reductionPercent >= 60 ? "🌟" : reductionPercent >= 40 ? "🌱" : "♻️"}
            </div>
            <h2 className="text-3xl font-bold text-foreground">Time's Up!</h2>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-green-600">{reductionPercent}%</p>
              <p className="text-xl text-muted-foreground">Emissions Reduced</p>
              <p className="text-lg text-muted-foreground">
                Final Emissions: <span className="font-semibold">{emissions} kg CO₂</span>
              </p>
            </div>
            <div className="pt-4">
              {reductionPercent >= 80 && <p className="text-lg text-green-600">Amazing! You're a climate hero! 🌍</p>}
              {reductionPercent >= 60 && reductionPercent < 80 && (
                <p className="text-lg text-blue-600">Great work! Keep pushing for more! 💪</p>
              )}
              {reductionPercent >= 40 && reductionPercent < 60 && (
                <p className="text-lg text-orange-600">Good start! Try to be more efficient! 🌱</p>
              )}
              {reductionPercent < 40 && <p className="text-lg text-red-600">Keep trying! Every action counts! ♻️</p>}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="font-semibold text-lg">Actions Taken: {actions.length}</h3>
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-sm">
                  <span>{action.name}</span>
                  <span className="text-green-600 font-semibold">-{action.reduction} kg CO₂</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={resetGame} size="lg" className="w-full mt-6">
            Play Again
          </Button>
        </div>
      </Card>
    )
  }

  if (!gameStarted) {
    return (
      <Card className="max-w-3xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="text-6xl">⚡</div>
          <h2 className="text-3xl font-bold text-foreground">Emission Race</h2>
          <p className="text-lg text-muted-foreground">
            You have 60 seconds to reduce emissions from 1000 kg CO₂ to as low as possible!
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto bg-muted/50 p-6 rounded-lg">
            <h3 className="font-semibold">How to Play:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Each action reduces emissions but costs time</li>
              <li>✓ Choose actions strategically to maximize reduction</li>
              <li>✓ Race against the clock to save the planet!</li>
              <li>✓ Try to reduce emissions by 80% or more!</li>
            </ul>
          </div>
          <Button onClick={startGame} size="lg" className="mt-6">
            Start Race
          </Button>
        </div>
      </Card>
    )
  }

  const emissionPercent = (emissions / 1000) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Time Left</p>
            <p className={`text-4xl font-bold ${timeLeft <= 10 ? "text-red-600" : "text-primary"}`}>{timeLeft}s</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Current Emissions</p>
            <p
              className={`text-4xl font-bold ${
                emissions <= 200 ? "text-green-600" : emissions <= 500 ? "text-blue-600" : "text-orange-600"
              }`}
            >
              {emissions}
            </p>
            <p className="text-xs text-muted-foreground">kg CO₂</p>
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Emission Level</span>
            <span className="font-semibold">{Math.round(emissionPercent)}%</span>
          </div>
          <Progress value={emissionPercent} className="h-3" />
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Available Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actionOptions.map((action, index) => (
            <button
              key={index}
              onClick={() => takeAction(action)}
              disabled={timeLeft < action.time}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                timeLeft >= action.time
                  ? "border-border hover:border-primary hover:bg-primary/5"
                  : "border-border opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="space-y-1">
                <p className="font-medium text-sm">{action.name}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-600 font-semibold">-{action.reduction} kg CO₂</span>
                  <span className="text-muted-foreground">⏱ {action.time}s</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Actions */}
      {actions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-3">Recent Actions ({actions.length})</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {actions
              .slice(-5)
              .reverse()
              .map((action, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                  <span>{action.name}</span>
                  <span className="text-green-600 font-semibold">-{action.reduction}</span>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}
