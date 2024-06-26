import React, { useState, useRef } from 'react';
import { data } from '../../assets/data';
import './Quiz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import Result from './Result';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (data[index].answer === ans) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        option_array[data[index].answer].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        setShowScore(true);
        return 0;
      }

      setIndex(prev => prev + 1);
      setLock(false);

      option_array.forEach(option => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setShowScore(false);
    setLock(false);
    setResult(false);

    option_array.forEach(option => {
      option.current.classList.remove('wrong');
      option.current.classList.remove('correct');
    });
  };

  const progressPercentage = ((index + 1) / data.length) * 100;

  return (
    <div className='container'>
      {showScore ? (
        <Result score={score} totalQuestions={data.length} restartQuiz={restartQuiz} />
      ) : (
        <>
          <div className='header'>
            <h1>SIMULADOR | Entrega de água</h1>
            <button className='restart-button' onClick={restartQuiz}>
              <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>
          <hr />
          <div className='question-container'>
            <h2>{index + 1}. {data[index].question}</h2>
          </div>
          <ul>
            {data[index].options.map((option, i) => (
              <li key={i} ref={option_array[i]} onClick={(e) => checkAns(e, i)}>
                {option}
              </li>
            ))}
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>
            {index + 1} of {data.length} questions
            <div className='progress-bar'>
              <div className='progress' style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
