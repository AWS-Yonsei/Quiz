import React, { useState } from 'react';
import CategorySelection from './components/CategorySelection';
import Quiz from './components/Quiz';
import quizData from './data/quizData';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = []; 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleRestartQuiz = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      {!selectedCategory ? (
        <CategorySelection
          categories={categories}
          onSelectCategory={handleCategorySelect}
        />
      ) : (
        <Quiz quizData={quizData} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
}

export default App;
