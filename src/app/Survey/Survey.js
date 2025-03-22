"use client";
import { useState } from "react";
import questions from "./Survey.json";

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, optionId) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      if (currentAnswers.includes(optionId)) {
        return {
          ...prevAnswers,
          [questionId]: currentAnswers.filter(id => id !== optionId),
        };
      } else {
        return {
          ...prevAnswers,
          [questionId]: [...currentAnswers, optionId],
        };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (currentQuestion === questions.length - 1) {
      console.log(answers);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#F7F7F7] to-[#E5E5E5]">
      {currentQuestion < questions.length && (
        <div
          id={`question-${currentQuestion}`}
          className={`animate-fade-in-out transition duration-500 ease-in-out ${
            currentQuestion < questions.length - 1 ? "animate-fade-out" : ""
          }`}
        >
          <div className="text-4xl font-bold mb-4 text-[#333333]">
            {questions[currentQuestion].question}
          </div>
          <div className="flex flex-col gap-4 mb-4">
            {questions[currentQuestion].options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center gap-2 p-4 rounded-lg shadow-lg text-black cursor-pointer ${
                  answers[questions[currentQuestion].id]?.includes(option.id)
                    ? "bg-[#FFAEFF] text-[#000000]"
                    : "bg-[#F2F2F2] hover:bg-[#FFAEFF] hover:text-[#000000] transition duration-300 ease-in-out"
                }`}
                onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
              >
                <span>{option.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              className="bg-[#F2F2F2] p-4 rounded-lg shadow-lg text-black hover:bg-[#FFAEFF] hover:text-[#000000] transition duration-300 ease-in-out"
              onClick={handlePrevious}
            >
              Previous
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                className="bg-[#F2F2F2] p-4 rounded-lg shadow-lg text-black hover:bg-[#FFAEFF] hover:text-[#000000] transition duration-300 ease-in-out"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="bg-[#F2F2F2] p-4 rounded-lg shadow-lg text-black hover:bg-[#FFAEFF] hover:text-[#000000] transition duration-300 ease-in-out"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;

