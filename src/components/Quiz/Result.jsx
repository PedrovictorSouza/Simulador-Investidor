import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import CostChart from './CostChart';
import '../../styles/quiz.css';
const Result = ({ score, totalQuestions, restartQuiz, totalCost, costData }) => {
  return (
    <div className='result-container fade-in' style={{ animationDelay: '0s' }}>
      <h2 className='fade-in' style={{ animationDelay: '0.2s' }}>Resultado do Quiz</h2>
      <p className='fade-in' style={{ animationDelay: '0.4s' }}>Você acertou {score} de {totalQuestions} perguntas!</p>
      <p className='fade-in' style={{ animationDelay: '0.6s' }}>O custo operacional total é: <strong>R$ {totalCost ? totalCost.toFixed(2) : '0.00'}</strong></p>
      <div className="chart-container fade-in" style={{ animationDelay: '0.8s' }}>
        <CostChart costData={costData} />
      </div>
      <button className='restart-button fade-in' style={{ animationDelay: '1s' }} onClick={restartQuiz}>
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
