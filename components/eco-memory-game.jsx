"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const ecologyPairs = [
  { id: 1, pairId: 101, content: "Photosynthesis" },
  { id: 2, pairId: 101, content: "Process by which plants make food" },
  { id: 3, pairId: 102, content: "Carbon Footprint" },
  { id: 4, pairId: 102, content: "Measure of CO₂ emissions" },
  { id: 5, pairId: 103, content: "Biodiversity" },
  { id: 6, pairId: 103, content: "Variety of life in an ecosystem" },
  { id: 7, pairId: 104, content: "Renewable Energy" },
  { id: 8, pairId: 104, content: "Energy from natural sources like wind or sun" },
]

function Card({ card, onClick, isFlipped, isMatched }) {
  return (
    <div
      className={`w-24 h-24 cursor-pointer transition-all duration-300 transform ${
        isFlipped || isMatched ? "scale-95" : "scale-100 hover:scale-105"
      }`}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute w-full h-full flex items-center justify-center rounded-lg font-semibold text-sm p-2 text-center transition-all duration-300 ${
            isFlipped || isMatched
              ? "bg-gradient-to-br from-green-400 to-emerald-600 text-white"
              : "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
          }`}
        >
          {isFlipped || isMatched ? card.content : "❓"}
        </div>
      </div>
    </div>
  )
}

export default function EcoMemoryGame() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (matched.length === ecologyPairs.length / 2 && matched.length > 0) {
      setGameWon(true)
    }
  }, [matched])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first].pairId === cards[second].pairId) {
        setMatched([...matched, cards[first].pairId])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 600)
      }
      setMoves(moves + 1)
    }
  }, [flipped])

  const initializeGame = () => {
    const shuffled = [...ecologyPairs].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(cards[index].pairId)) {
      setFlipped([...flipped, index])
    }
  }

  const resetGame = () => {
    initializeGame()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Eco Memory Game 🧠</h1>
        <p className="text-lg text-muted-foreground">
          Match pairs of ecology and climate concepts. Flip cards to find matching pairs!
        </p>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center gap-8 text-center">
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-muted-foreground text-sm">Moves</p>
          <p className="text-3xl font-bold text-foreground">{moves}</p>
        </div>
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-muted-foreground text-sm">Matched Pairs</p>
          <p className="text-3xl font-bold text-foreground">{matched.length}/4</p>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4 p-8 bg-gradient-to-br from-background to-muted rounded-lg">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onClick={() => handleCardClick(index)}
              isFlipped={flipped.includes(index)}
              isMatched={matched.includes(card.pairId)}
            />
          ))}
        </div>
      </div>

      {/* Win Message */}
      {gameWon && (
        <div className="text-center space-y-4">
          <div className="p-6 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600">
            <p className="text-white text-2xl font-bold">🎉 Congratulations! 🎉</p>
            <p className="text-green-50">You matched all pairs in {moves} moves!</p>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button onClick={resetGame} className="px-8 py-3 bg-primary text-primary-foreground hover:opacity-90 text-lg">
          {gameWon ? "Play Again" : "Reset Game"}
        </Button>
      </div>
    </div>
  )
}
