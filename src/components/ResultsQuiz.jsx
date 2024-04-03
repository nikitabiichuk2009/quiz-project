import quizImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questionsData";
export default function Results({ allSelectedAnswers }) {
  const totalQuestions = allSelectedAnswers.length;
  const skippedCount = allSelectedAnswers.filter(
    (answer) => answer === null
  ).length;
  const correctCount = allSelectedAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  ).length;
  const answeredIncorrectlyCount = totalQuestions - skippedCount - correctCount;

  const skippedPercentage = Math.round((skippedCount / totalQuestions) * 100);
  const correctPercentage = Math.round((correctCount / totalQuestions) * 100);
  const answeredIncorrectlyPercentage = Math.round(
    (answeredIncorrectlyCount / totalQuestions) * 100
  );

  return (
    <div id="summary">
      <img src={quizImage} alt="Quiz is over image" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{answeredIncorrectlyPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
      </div>
      <ol>
        {allSelectedAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer !== null ? answer : "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
