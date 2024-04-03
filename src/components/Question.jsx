import Timer from "./TimerQuestion";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questionsData";

export default function Question({
  currentQuestion,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectAnswer(selectedAnswer) {
    setAnswer({
      selectedAnswer: selectedAnswer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: selectedAnswer,
        isCorrect: QUESTIONS[currentQuestion].answers[0] === selectedAnswer,
      });
      setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, 2000);
    }, 1000);
  }

  const handleTimeout = () => {
    if (answer.selectedAnswer === "") {
      onSkipAnswer();
    }
  };
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <Timer
        key={timer}
        timeOut={timer}
        onTimeout={handleTimeout}
        mode={answerState}
      />
      <h2>{QUESTIONS[currentQuestion].text}</h2>
      <Answers
        availableAnswers={QUESTIONS[currentQuestion].answers}
        selectedAnswer={answer.selectedAnswer}
        handleSelectAnswer={handleSelectAnswer}
        answerState={answerState}
      />
    </div>
  );
}
