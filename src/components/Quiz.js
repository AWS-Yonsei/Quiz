import React, { useState } from 'react';
import GameScreen from './GameScreen';

const Quiz = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    
    setUserAnswers([...userAnswers, answer]);

    
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  const currentQuestionData = quizData[currentQuestion];

  return (
    <div>
      {showResult ? (
        <div>
          <h2>퀴즈가 종료되었습니다!</h2>
          <p>결과: {calculateResult()}</p>
          <button onClick={handleRestart}>처음부터 다시하기</button>
        </div>
      ) : (
        
        <GameScreen
          questionData={currentQuestionData}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

const calculateResult = ({ quizData, userAnswers }) => {
  
  const correctAnswers = quizData.filter(
    (question, index) => question.correctAnswer === userAnswers[index]
  );
  return `정답 수: ${correctAnswers.length}/${quizData.length}`;
};

export default Quiz;