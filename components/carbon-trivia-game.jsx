"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const triviaQuestions = [
  {
    id: 1,
    question: "What percentage of global CO₂ emissions comes from transportation?",
    options: ["14%", "24%", "34%", "44%"],
    correct: 1,
    explanation:
      "Transportation accounts for approximately 24% of global CO₂ emissions, making it one of the largest contributors.",
  },
  {
    id: 2,
    question: "Which renewable energy source is the fastest growing worldwide?",
    options: ["Wind", "Solar", "Hydroelectric", "Geothermal"],
    correct: 1,
    explanation:
      "Solar energy is the fastest growing renewable energy source, with installations increasing dramatically each year.",
  },
  {
    id: 3,
    question: "How much CO₂ does one tree absorb per year on average?",
    options: ["10 kg", "22 kg", "50 kg", "100 kg"],
    correct: 1,
    explanation: "A mature tree absorbs approximately 22 kg (48 pounds) of CO₂ per year on average.",
  },
  {
    id: 4,
    question: "Which sector produces the most greenhouse gas emissions globally?",
    options: ["Agriculture", "Energy", "Industry", "Buildings"],
    correct: 1,
    explanation:
      "Energy production and consumption is the largest source of greenhouse gas emissions, accounting for about 73% globally.",
  },
  {
    id: 5,
    question: "By what year do scientists recommend achieving net-zero emissions?",
    options: ["2030", "2040", "2050", "2060"],
    correct: 2,
    explanation:
      "Scientists recommend achieving net-zero emissions by 2050 to limit global warming to 1.5°C above pre-industrial levels.",
  },
  {
    id: 6,
    question: "What is the carbon footprint of sending one email?",
    options: ["0.3g CO₂", "4g CO₂", "15g CO₂", "50g CO₂"],
    correct: 1,
    explanation:
      "Sending a standard email produces about 4g of CO₂, while an email with attachments can produce up to 50g.",
  },
  {
    id: 7,
    question: "Which country is the largest producer of renewable energy?",
    options: ["USA", "China", "Germany", "India"],
    correct: 1,
    explanation:
      "China is the world's largest producer of renewable energy, leading in both solar and wind power capacity.",
  },
  {
    id: 8,
    question: "How much does LED lighting reduce energy consumption compared to incandescent bulbs?",
    options: ["25%", "50%", "75%", "90%"],
    correct: 2,
    explanation:
      "LED lights use approximately 75% less energy than traditional incandescent bulbs and last much longer.",
  },
]

export default function CarbonTriviaGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === triviaQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setGameComplete(true)
    }
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setGameComplete(false)
  }

  if (gameComplete) {
    const percentage = Math.round((score / triviaQuestions.length) * 100)
    return (
      <Card className="max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="text-6xl">🏆</div>
          <h2 className="text-3xl font-bold text-foreground">Game Complete!</h2>
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary">{percentage}%</p>
            <p className="text-xl text-muted-foreground">
              You scored {score} out of {triviaQuestions.length}
            </p>
          </div>
          <div className="pt-4">
            {percentage >= 80 && <p className="text-lg text-green-600">Outstanding! You're a carbon expert! 🌟</p>}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-lg text-blue-600">Great job! Keep learning! 💚</p>
            )}
            {percentage < 60 && <p className="text-lg text-orange-600">Good effort! Try again to improve! 🌱</p>}
          </div>
          <Button onClick={resetGame} size="lg" className="mt-6">
            Play Again
          </Button>
        </div>
      </Card>
    )
  }

  const question = triviaQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / triviaQuestions.length) * 100

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Carbon Trivia Challenge</h2>
              <div className="text-lg font-semibold text-primary">
                Score: {score}/{triviaQuestions.length}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Question {currentQuestion + 1} of {triviaQuestions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question */}
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="text-xl font-medium text-foreground text-balance">{question.question}</p>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === null
                    ? "border-border hover:border-primary hover:bg-primary/5"
                    : index === question.correct
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : selectedAnswer === index
                        ? "border-red-500 bg-red-50 dark:bg-red-950"
                        : "border-border opacity-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      selectedAnswer === null
                        ? "bg-muted text-foreground"
                        : index === question.correct
                          ? "bg-green-500 text-white"
                          : selectedAnswer === index
                            ? "bg-red-500 text-white"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-base font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Did you know?</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentQuestion < triviaQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
