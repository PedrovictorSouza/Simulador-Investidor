import React from 'react';
import './Quiz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const Result = ({ score, totalQuestions, restartQuiz }) => {
  return (
    <div className='result-container'>
      <h2>Resultado do Quiz</h2>
      <p>Você acertou {score} de {totalQuestions} perguntas!</p>
      <button className='restart-button' onClick={restartQuiz}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export default Result;
