// GameScreen.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import EnemyImage from '../images/Enemy.png';
import CharacterImage from '../images/Character.png';
import background from "../images/background.png";
import sword from "../images/sword.png";

import diabetesQuiz from '../data/diabetesQuiz.json'; 
import highbloodpressureQuiz from '../data/highbloodpressureQuiz.json';

const API_URL = "http://localhost:8080";

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
var sendingcategory = "";
var i = 0;

const GameScreen = ({ questionData, onAnswer, onGameOver, onCategorySelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerHP, setPlayerHP] = useState(100);  
  const [enemyHP, setEnemyHP] = useState(100);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizResults, setQuizResults] = useState([]);

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


  const getQuestionData = () => {
    switch(selectedCategory) {
      case 'diabetes':
        sendingcategory = 'diabetes'
        return diabetesQuiz;
      case 'highbloodpressure':
        sendingcategory = 'highbloodpressure'
        return highbloodpressureQuiz;
      default:
        return null; 
    }
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {

      const isGameFinished = false; 

      if (isGameFinished) {
        setIsGameOver(true);
        onGameOver(isCorrect);
      } else {
        setIsCorrect(isCorrect);
        onAnswer(isCorrect);
        setSelectedAnswer(null);
      }
    
  };
  
  const handleSubmitAttack = () => {
    if (selectedAnswer !== null && !isGameOver) {
      const correctAnswer = questionData.correctAnswer;
      const isCorrect = selectedAnswer === correctAnswer; 
      const quiz = diabetesQuiz[i];

      const result = {
        qid: i + 1, // 문제 번호 (1부터 시작)
        content : "Jane Smith",
        result: isCorrect, // 문제를 맞추면 true, 틀리면 false
        comment: quiz.reason // 문제의 이유
      }
      setQuizResults(prevQuizResults => [...prevQuizResults, result]);
      i++

      if (isCorrect) {
        setModalIsOpen(true);
        state = "correct";
        setEnemyHP(enemyHP - 20);       
        
        
      } else {
        setModalIsOpen(true);
        state = "wrong"
        setPlayerHP(playerHP - 20);
        
        }
              
    }
  };


  const sendData = async () => {
    console.log('work');
    console.log(quizResults);
    return axios
    .post(API_URL+'/quiz/result', { 
      uid: 'user2',
      category: sendingcategory,
      quiz_results: quizResults})
      .then((response) => {
        console.log(response);
        return response;
  })
}

  const renderGameOverScreen = () => {
    return (
      <div>
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
      flexDirection: 'row',
      width: '100%',
    },
    answerButton: {
      cursor: 'pointer',
      padding: '10px',
      margin: '5px',
      marginTop: '-70px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      flexDirection: 'row',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '400px',
      width: '350px', 
      height: '350px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.rowContainer}>
        <div style={styles.characterContainer}>
            <img src={CharacterImage} alt="주인공" style={{ width: '200px', height: '200px' }} />
            <div style={{ ...styles.healthBar, backgroundColor: 'blue', width: `${playerHP}%` }}></div>
            <p>HP: {playerHP}</p>
          </div>

        <div style={styles.questionContainer}>
          <h2>{questionData.question}</h2>
        </div>

        <div style={styles.characterContainer}>
          <img src={EnemyImage} alt="질병" style={{ width: '200px', height: '200px' }} />
          <div style={{ ...styles.healthBar, width: `${enemyHP}%` }}></div>
          <p>HP: {enemyHP}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
            onClick={() => handleAnswerClick('O')}
            style={{
              ...styles.answerButton,            
              marginRight: '10px',  
              paddingBottom: '35px',
              backgroundColor: selectedAnswer === 'O' ? 'lightblue' : 'white',
            }}
          >
            O
          </div>

          <button onClick={handleSubmitAttack} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '180px', height: '180px', marginTop: '50px'}}>
          <img src={sword} alt="Sword" style={{ width: '150px', height: '150px'}} />
            <span style={{fontSize : '20px'}}>공격하기</span>
          </button>

          
          <div
          onClick={() => handleAnswerClick('X')}
          style={{
            ...styles.answerButton,            
            marginLeft: '10px',
            paddingBottom: '35px',
            backgroundColor: selectedAnswer === 'X' ? 'lightblue' : 'white',
          }}
        >
          X
        </div>
      </div>
      
      <Modal
        isOpen={modalIsOpen2} 
        onRequestClose={() => setModalIsOpen2(false)} 
        style={modalStyles}
      >
        <h2>{state === "correct" && iswin === "true" && <p>승리하셨습니다.</p>}</h2>
        <h2>{state === "wrong" && iswin === "false" && <p>패배하셨습니다.</p>}</h2>
        <button onClick={() => sendData()}>확인</button>
      </Modal>

      <Modal
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        style={modalStyles}
      >
        <h2>{state === "correct" && <p>정답입니다. <br></br>{questionData.reason}</p>}</h2>
        <h2>{state === "wrong" && <p>오답입니다. <br></br>{questionData.reason}</p>}</h2>
        
        <button onClick={() => {
          setModalIsOpen(false); 
          handleSubmitAnswer(); 
        }}>확인</button>
      </Modal>

      <ToastContainer position="bottom-center" autoClose={3000} />

      {isGameOver && renderGameOverScreen()}
    </div>
  );
};

export default GameScreen;
