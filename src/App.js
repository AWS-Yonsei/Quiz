import React, { useState } from 'react';
import CategorySelection from './components/CategorySelection';
import Quiz from './components/Quiz';
import diabetesQuiz from './data/diabetesQuiz.json';
import highbloodpressureQuiz from './data/highbloodpressureQuiz.json';
export const sendData = '';

function App() {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === '당뇨병') {
      setQuizData(diabetesQuiz);
    } else if (category === '고혈압') {
      setQuizData(highbloodpressureQuiz);
    } 
  };

  const handleRestartQuiz = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="App">
      {!selectedCategory ? (
        <CategorySelection
          onSelectCategory={handleCategorySelect}
        />
      ) : (
        <Quiz quizData={quizData} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
}

export default App;

