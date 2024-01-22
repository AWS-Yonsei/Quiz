// Question 컴포넌트
import React from 'react';

const Question = ({ questionData, onAnswer }) => {
  return (
    <div>
      <h3>{questionData.question}</h3>
      <ul>
        {questionData.options.map((option, index) => (
          <li key={index} onClick={() => onAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
