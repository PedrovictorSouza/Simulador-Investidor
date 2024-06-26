import React from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import CostChart from './CostChart';

const Result = ({ score, totalQuestions, restartQuiz, totalCost, costData }) => {
  return (
    <div className='result-container'>
      <h2>Resultado do Quiz</h2>
      <p>Você acertou {score} de {totalQuestions} perguntas!</p>
      <p>O custo operacional total é: R$ {totalCost ? totalCost.toFixed(2) : '0.00'}</p>
      <CostChart costData={costData} />
      <button className='restart-button' onClick={restartQuiz}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired,
  totalCost: PropTypes.number,
  costData: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    referenceCost: PropTypes.number.isRequired
  })).isRequired
};

Result.defaultProps = {
  totalCost: 0
};

export default Result;
