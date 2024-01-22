// GameScreen.jsx
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GameScreen = ({ questionData, onAnswer, onGameOver, onCategorySelect, onRestart }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);

  useEffect(() => {
    if (playerHP <= 0) {
      toast.error('게임 오버! 주인공이 패배했습니다.');
      setIsGameOver(true);
    }
    if (enemyHP <= 0) {
      toast.success('축하합니다! 주인공이 승리했습니다.');
      setIsGameOver(true);
    }
  }, [playerHP, enemyHP]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && !isGameOver) {
      const correctAnswer = questionData.correctAnswer;
      const isCorrect = selectedAnswer === correctAnswer;

      if (isCorrect) {
        toast.success('정답입니다!', { autoClose: 1500 });
        setEnemyHP(enemyHP - 20);
      } else {
        toast.error(`틀렸습니다! 정답은 ${correctAnswer} 입니다.`, { autoClose: 1500 });
        setPlayerHP(playerHP - 20);
      }

      const isGameFinished = false; 

      if (isGameFinished) {
        setIsGameOver(true);
        onGameOver(isCorrect);
      } else {
        setIsCorrect(isCorrect);
        onAnswer(isCorrect);
        setSelectedAnswer(null);
      }
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setPlayerHP(100);
    setEnemyHP(100);
    setSelectedAnswer(null);

    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  const handleCategorySelect = () => {
    setIsGameOver(false);
    setPlayerHP(100);
    setEnemyHP(100);
    setSelectedAnswer(null);

    if (typeof onCategorySelect === 'function') {
      onCategorySelect();
    }
  };

  const renderGameOverScreen = () => {
    return (
      <div>
        <h2>{isGameOver ? (isCorrect ? '승리하였습니다!' : '패배하였습니다!') : ''}</h2>
      </div>
    );
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    rowContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      width: '100%',
    },
    characterContainer: {
      textAlign: 'center',
    },
    characterTitle: {
      fontSize: '1.5em',
      marginBottom: '10px',
      color: 'blue',
    },
    healthBar: {
      width: '100%',
      height: '20px',
      backgroundColor: 'red',
      marginTop: '10px',
      transition: 'width 0.3s',
    },
    questionContainer: {
      textAlign: 'center',
      marginBottom: '20px',
      flex: 1,
    },
    answersContainer: {
      textAlign: 'center',
      width: '100%',
    },
    answerButton: {
      cursor: 'pointer',
      padding: '10px',
      margin: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1em',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.rowContainer}>
        <div style={styles.characterContainer}>
          <h2 style={styles.characterTitle}>주인공</h2>
          <div style={{ ...styles.healthBar, backgroundColor: 'blue', width: `${playerHP}%` }}></div>
          <p>HP: {playerHP}</p>
        </div>

        <div style={styles.questionContainer}>
          <h2>{questionData.question}</h2>
        </div>

        <div style={styles.characterContainer}>
          <h2 style={styles.characterTitle}>질병</h2>
          <div style={{ ...styles.healthBar, width: `${enemyHP}%` }}></div>
          <p>HP: {enemyHP}</p>
        </div>
      </div>

      <div style={styles.answersContainer}>
        {questionData.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleAnswerClick(option)}
            style={{
              ...styles.answerButton,
              backgroundColor: selectedAnswer === option ? 'lightblue' : 'white',
            }}
          >
            {option}
          </div>
        ))}
        <button onClick={handleSubmitAnswer}>답 제출</button>
      </div>

      <ToastContainer position="bottom-center" autoClose={3000} />

      {isGameOver && renderGameOverScreen()}
    </div>
  );
};

export default GameScreen;
