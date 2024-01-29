// GameScreen.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import EnemyImage from '../images/Enemy.jpg';
import CharacterImage from '../images/Character.jpg';
import background from "../images/background.png";


const modalStyles = {
  content: {
    width: '300px',
    height: '300px',
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '20px',
  },
};

var state = "";
var iswin = "";

const GameScreen = ({ questionData, onAnswer, onGameOver, onCategorySelect, onRestart }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);  
  const [enemyHP, setEnemyHP] = useState(100);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  useEffect(() => {
    if (playerHP <= 0) {
      iswin = "false";
      setModalIsOpen2(true);
      setIsGameOver(true);
    }
    if (enemyHP <= 0) {
      iswin = "true";
      setModalIsOpen2(true);
      setIsGameOver(true);
    }
  }, [playerHP, enemyHP]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleRestartGame = () => {
    // 게임 재시작
    setIsGameOver(false);
    setPlayerHP(100);
    setEnemyHP(100);
    setSelectedAnswer(null);
    setCurrentQuestion(0);
    if (typeof onRestart === 'function') {
      onRestart();
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && !isGameOver) {
      const correctAnswer = questionData.correctAnswer1;
      const isCorrect = selectedAnswer === correctAnswer; 

      if (isCorrect) {
        setModalIsOpen(true);
        //toast.success('정답입니다!', { autoClose: 1500 });
        state = "correct";
        setEnemyHP(enemyHP - 20);       
        
        
      } else {
        setModalIsOpen(true);
        //toast.error(`틀렸습니다! 정답은 ${correctAnswer} 입니다.`, { autoClose: 1500 });
        state = "wrong";
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
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover', 
      minHeight: '100vh', 
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
            <img src={CharacterImage} alt="주인공" style={{ width: '100px', height: '100px' }} />
            <div style={{ ...styles.healthBar, backgroundColor: 'blue', width: `${playerHP}%` }}></div>
            <p>HP: {playerHP}</p>
          </div>

        <div style={styles.questionContainer}>
          <h2>{questionData.question}</h2>
        </div>

        <div style={styles.characterContainer}>
          <img src={EnemyImage} alt="질병" style={{ width: '100px', height: '100px' }} />
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

      <Modal
        isOpen={modalIsOpen2} 
        onRequestClose={() => setModalIsOpen2(false)} 
        style={modalStyles}
      >
        <h2>{state === "correct" && iswin === "true" && <p>승리하셨습니다.</p>}</h2>
        <h2>{state === "wrong" && iswin === "false" && <p>패배하셨습니다.</p>}</h2>
        <button onClick={() => handleCategorySelect}>확인</button>
      </Modal>

      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        style={modalStyles}
      >
        <h2>{state === "correct" && <p>정답입니다. <br></br>{questionData.reason}</p>}</h2>
        <h2>{state === "wrong" && <p>오답입니다. <br></br>답은 {questionData.correctAnswer}입니다. <br></br>{questionData.reason}</p>}</h2>
        
        <button onClick={() => setModalIsOpen(false)}>확인</button>
      </Modal>

      


      <ToastContainer position="bottom-center" autoClose={3000} />

      {isGameOver && renderGameOverScreen()}
    </div>
  );
};
export default GameScreen;
