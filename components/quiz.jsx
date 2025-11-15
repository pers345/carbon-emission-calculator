"use client";

import React, { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "Which process do plants use to make their own food?",
    options: ["Respiration", "Photosynthesis", "Fermentation", "Germination"],
    correctIndex: 1,
    fact: "Plants use sunlight, water, and carbon dioxide during photosynthesis to make glucose and oxygen."
  },
  {
    id: 2,
    question: "Which of these animals is a pollinator?",
    options: ["Squirrel", "Eagle", "Bee", "Shark"],
    correctIndex: 2,
    fact: "Bees transfer pollen between flowers, helping plants reproduce and grow fruits and seeds."
  },
  {
    id: 3,
    question: "What is the largest rainforest in the world?",
    options: ["Congo Rainforest", "Amazon Rainforest", "Daintree Rainforest", "Sundarbans"],
    correctIndex: 1,
    fact: "The Amazon Rainforest is often called the 'lungs of the Earth' because it produces so much oxygen."
  },
  {
    id: 4,
    question: "Which gas do trees absorb that helps reduce climate change?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctIndex: 2,
    fact: "Trees store carbon dioxide in their trunks, branches, leaves, and roots."
  },
  {
    id: 5,
    question: "What do we call animals that only eat plants?",
    options: ["Carnivores", "Omnivores", "Detritivores", "Herbivores"],
    correctIndex: 3,
    fact: "Herbivores like deer, rabbits, and many insects depend on plants for energy."
  }
];

export default function NatureQuizGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  function handleOptionClick(index) {
    if (isAnswered) return; // prevent changing answer

    setSelectedIndex(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
  }

  const progress = Math.round(((currentIndex + (showSummary ? 1 : 0)) / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-sky-100 p-4">
      <div className="w-full max-w-xl bg-white/90 shadow-xl rounded-2xl p-6 md:p-8 border border-emerald-100">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-800">
              Nature Explorer Quiz
            </h1>
            <p className="text-sm md:text-base text-emerald-700 mt-1">
              Test your knowledge about our planet 🌍
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
              Score
            </p>
            <p className="text-lg font-bold text-emerald-800">
              {score} / {QUESTIONS.length}
            </p>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full bg-emerald-100 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-emerald-500 h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!showSummary ? (
          <>
            {/* Question */}
            <div className="mb-4">
              <p className="text-xs text-emerald-600 font-medium mb-1">
                Question {currentIndex + 1} of {QUESTIONS.length}
              </p>
              <h2 className="text-lg md:text-xl font-semibold text-emerald-900">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-4">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctIndex;
                const isSelected = index === selectedIndex;

                let optionClasses =
                  "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm md:text-base";

                if (!isAnswered) {
                  optionClasses +=
                    " border-emerald-200 bg-white/80 hover:bg-emerald-50 hover:border-emerald-400 cursor-pointer";
                } else if (isSelected && isCorrect) {
                  optionClasses +=
                    " bg-emerald-500 text-white border-emerald-600 shadow-sm";
                } else if (isSelected && !isCorrect) {
                  optionClasses +=
                    " bg-red-100 text-red-800 border-red-300";
                } else if (!isSelected && isCorrect) {
                  optionClasses +=
                    " bg-emerald-50 text-emerald-900 border-emerald-300";
                } else {
                  optionClasses +=
                    " bg-white/70 text-emerald-900 border-emerald-100";
                }

                return (
                  <button
                    key={index}
                    className={optionClasses}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            <div className="min-h-[56px] mb-4">
              {isAnswered && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800">
                  {selectedIndex === currentQuestion.correctIndex ? (
                    <p className="font-semibold mb-1">✅ Correct!</p>
                  ) : (
                    <p className="font-semibold mb-1">
                      ❌ Not quite. The correct answer is{" "}
                      <span className="underline">
                        {
                          currentQuestion.options[
                            currentQuestion.correctIndex
                          ]
                        }
                      </span>
                      .
                    </p>
                  )}
                  <p className="text-emerald-900 text-xs md:text-sm mt-1">
                    🌿 {currentQuestion.fact}
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleRestart}
                className="text-xs md:text-sm text-emerald-700 hover:text-emerald-900 underline"
              >
                Restart quiz
              </button>
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className={`px-4 py-2 rounded-xl text-sm md:text-base font-semibold shadow-sm transition-colors ${
                  isAnswered
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-emerald-200 text-emerald-800 cursor-not-allowed"
                }`}
              >
                {currentIndex + 1 === QUESTIONS.length ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          // Summary screen
          <div className="text-center space-y-4 py-4">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-900">
              🌳 Quiz Complete!
            </h2>
            <p className="text-emerald-800">
              You scored{" "}
              <span className="font-bold">
                {score} out of {QUESTIONS.length}
              </span>
              .
            </p>
            <p className="text-sm text-emerald-700">
              Every small step in learning about nature helps us protect it
              better. Keep exploring! 🌎
            </p>
            <button
              onClick={handleRestart}
              className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm md:text-base font-semibold shadow-sm hover:bg-emerald-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
