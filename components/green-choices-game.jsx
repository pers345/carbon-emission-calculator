"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const scenarios = [
  {
    id: 1,
    title: "Morning Commute",
    description: "You need to get to work 5 miles away. How will you travel?",
    choices: [
      { text: "Drive alone in a gas car", impact: -50, co2: "2.4 kg CO₂" },
      { text: "Take public transportation", impact: 30, co2: "0.8 kg CO₂" },
      { text: "Bike to work", impact: 50, co2: "0 kg CO₂" },
      { text: "Carpool with colleagues", impact: 40, co2: "0.6 kg CO₂" },
    ],
  },
  {
    id: 2,
    title: "Lunch Time",
    description: "What will you choose for lunch today?",
    choices: [
      { text: "Beef burger", impact: -40, co2: "3.3 kg CO₂" },
      { text: "Chicken sandwich", impact: -10, co2: "1.2 kg CO₂" },
      { text: "Vegetarian meal", impact: 40, co2: "0.4 kg CO₂" },
      { text: "Locally sourced salad", impact: 50, co2: "0.2 kg CO₂" },
    ],
  },
  {
    id: 3,
    title: "Shopping Trip",
    description: "You're buying groceries. What bag will you use?",
    choices: [
      { text: "Plastic bags from store", impact: -40, co2: "0.5 kg CO₂" },
      { text: "Paper bags", impact: -20, co2: "0.3 kg CO₂" },
      { text: "Reusable cotton bag", impact: 50, co2: "0 kg CO₂" },
      { text: "Backpack from home", impact: 50, co2: "0 kg CO₂" },
    ],
  },
  {
    id: 4,
    title: "Home Temperature",
    description: "It's hot outside. How will you cool your home?",
    choices: [
      { text: "AC at 68°F all day", impact: -50, co2: "4.8 kg CO₂" },
      { text: "AC at 72°F when home", impact: -20, co2: "2.4 kg CO₂" },
      { text: "Fans and open windows", impact: 40, co2: "0.4 kg CO₂" },
      { text: "Natural ventilation only", impact: 50, co2: "0 kg CO₂" },
    ],
  },
  {
    id: 5,
    title: "Electronics",
    description: "Your old phone still works but there's a new model. What do you do?",
    choices: [
      { text: "Buy the latest model", impact: -50, co2: "80 kg CO₂" },
      { text: "Upgrade only if needed", impact: 20, co2: "40 kg CO₂" },
      { text: "Keep current phone", impact: 50, co2: "0 kg CO₂" },
      { text: "Buy refurbished if needed", impact: 40, co2: "20 kg CO₂" },
    ],
  },
]

export default function GreenChoicesGame() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [totalImpact, setTotalImpact] = useState(0)
  const [choices, setChoices] = useState([])
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [gameComplete, setGameComplete] = useState(false)

  const handleChoice = (choiceIndex) => {
    if (selectedChoice !== null) return

    const choice = scenarios[currentScenario].choices[choiceIndex]
    setSelectedChoice(choiceIndex)
    setTotalImpact(totalImpact + choice.impact)
    setChoices([...choices, { scenario: scenarios[currentScenario].title, choice: choice.text, impact: choice.impact }])
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedChoice(null)
    } else {
      setGameComplete(true)
    }
  }

  const resetGame = () => {
    setCurrentScenario(0)
    setTotalImpact(0)
    setChoices([])
    setSelectedChoice(null)
    setGameComplete(false)
  }

  if (gameComplete) {
    const avgImpact = totalImpact / scenarios.length
    return (
      <Card className="max-w-3xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {totalImpact >= 150 ? "🌟" : totalImpact >= 50 ? "🌱" : totalImpact >= 0 ? "♻️" : "⚠️"}
            </div>
            <h2 className="text-3xl font-bold text-foreground">Your Environmental Impact</h2>
            <div
              className={`text-6xl font-bold ${
                totalImpact >= 150
                  ? "text-green-600"
                  : totalImpact >= 50
                    ? "text-blue-600"
                    : totalImpact >= 0
                      ? "text-orange-600"
                      : "text-red-600"
              }`}
            >
              {totalImpact > 0 ? "+" : ""}
              {totalImpact}
            </div>
            <p className="text-lg text-muted-foreground">
              {totalImpact >= 150 && "Excellent! You're a sustainability champion! 🌍"}
              {totalImpact >= 50 && totalImpact < 150 && "Good job! You're making eco-friendly choices! 💚"}
              {totalImpact >= 0 && totalImpact < 50 && "Room for improvement. Small changes make a big difference! 🌱"}
              {totalImpact < 0 && "Consider more sustainable choices to reduce your impact! ♻️"}
            </p>
          </div>

          <div className="space-y-3 pt-6">
            <h3 className="font-semibold text-lg">Your Choices:</h3>
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{choice.scenario}</p>
                  <p className="text-xs text-muted-foreground">{choice.choice}</p>
                </div>
                <div className={`text-sm font-semibold ${choice.impact > 0 ? "text-green-600" : "text-red-600"}`}>
                  {choice.impact > 0 ? "+" : ""}
                  {choice.impact}
                </div>
              </div>
            ))}
          </div>

          <Button onClick={resetGame} size="lg" className="w-full mt-6">
            Try Different Choices
          </Button>
        </div>
      </Card>
    )
  }

  const scenario = scenarios[currentScenario]
  const progress = ((currentScenario + 1) / scenarios.length) * 100

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Green Choices</h2>
              <div className={`text-lg font-semibold ${totalImpact >= 0 ? "text-green-600" : "text-red-600"}`}>
                Impact: {totalImpact > 0 ? "+" : ""}
                {totalImpact}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Scenario {currentScenario + 1} of {scenarios.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Scenario */}
          <div className="space-y-3">
            <div className="bg-primary/10 px-4 py-2 rounded-lg inline-block">
              <h3 className="text-lg font-bold text-primary">{scenario.title}</h3>
            </div>
            <p className="text-lg text-foreground">{scenario.description}</p>
          </div>

          {/* Choices */}
          <div className="grid gap-3">
            {scenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                disabled={selectedChoice !== null}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedChoice === null
                    ? "border-border hover:border-primary hover:bg-primary/5"
                    : selectedChoice === index
                      ? choice.impact > 0
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : "border-orange-500 bg-orange-50 dark:bg-orange-950"
                      : "border-border opacity-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-base flex-1">{choice.text}</span>
                  {selectedChoice === index && (
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${choice.impact > 0 ? "text-green-600" : "text-red-600"}`}>
                        {choice.impact > 0 ? "+" : ""}
                        {choice.impact}
                      </div>
                      <div className="text-xs text-muted-foreground">{choice.co2}</div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Next Button */}
          {selectedChoice !== null && (
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentScenario < scenarios.length - 1 ? "Next Scenario" : "See Results"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
