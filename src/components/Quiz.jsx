// src/components/Quiz.jsx

import React, { useState } from 'react';
import GameScreen from './GameScreen';

const Quiz = ({ quizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    // 사용자의 답을 저장
    setUserAnswers([...userAnswers, answer]);

    // 다음 질문으로 이동 또는 결과 표시
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    // 게임 재시작
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
        // 게임 화면
        <GameScreen
          questionData={currentQuestionData}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

const calculateResult = ({ quizData, userAnswers }) => {
  // 결과 계산 로직을 추가하세요.
  const correctAnswers = quizData.filter(
    (question, index) => question.correctAnswer === userAnswers[index]
  );
  return `정답 수: ${correctAnswers.length}/${quizData.length}`;
};

export default Quiz;
