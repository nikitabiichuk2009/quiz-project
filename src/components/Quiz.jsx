import { useState, useCallback } from "react";
import QUESTIONS from "../questionsData";
import Question from "./Question";
import Results from "./ResultsQuiz";
export default function Quiz() {
  //   const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const currentQuestion = answers.length;
  //   For example user answered 2 questions so the next question
  //  is 3rd, but because index starts from 0,
  //  the index would be 2, so the length of the answers arrayState

  const isQuizOver = currentQuestion === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (isQuizOver) {
    return <Results allSelectedAnswers={answers} />;
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={currentQuestion}
          currentQuestion={currentQuestion}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
