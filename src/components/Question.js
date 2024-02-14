import React from 'react';

const Question = ({ questionData, onAnswer }) => {
  const handleAnswerClick = (option) => {
    onAnswer(option, questionData.correctAnswer); // 선택한 답변과 정답을 함께 전달
  };

  return (
    <div>
      <h3>{questionData.question}</h3>
      <ul>
        {questionData.options.map((option, index) => (
          <li key={index} onClick={() => handleAnswerClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
