import React, { useState, useRef, useEffect, useMemo } from 'react';
import { data } from '../../assets/data';
import '../../styles/quiz.css';
import Result from './Result';
import Onboarding from './Onboarding'; // Import the Onboarding component
import Header from './Header'; // Import the Header component
import Question from './Question'; // Import the Question component
import ProgressBar from './ProgressBar'; // Import the ProgressBar component

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [costData, setCostData] = useState([]);
  const [run, setRun] = useState(false); // State to control the onboarding
  const [ready, setReady] = useState(false); // State to control DOM readiness

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const steps = useMemo(() => [
    {
      target: '.question-container',
      content: 'This is where the questions will be displayed.',
    },
    {
      target: '.options-container',
      content: 'These are the possible answers for the current question. Only one of these answers is correct.',
    },
    {
      target: '.next-button',
      content: 'Click this button to proceed to the next question.',
    },
    {
      target: '.header .restart-button',
      content: 'Click this button to restart the quiz.',
    },
    {
      target: '.progress-bar',
      content: 'This shows your progress through the quiz.',
    },
  ], []);
  

  useEffect(() => {
    console.log("Checking if all elements are present in the DOM");
    let attempts = 0;
    const maxAttempts = 50;
    const intervalId = setInterval(() => {
      const allElementsPresent = steps.every(step => {
        const element = document.querySelector(step.target);
        console.log(`Checking element: ${step.target}`, element);
        return element;
      });
      if (allElementsPresent) {
        setReady(true);
        console.log("All elements are present, setting ready to true");
        clearInterval(intervalId);
      }
      if (attempts >= maxAttempts) {
        console.warn("Maximum attempts reached. Some elements might be missing.");
        clearInterval(intervalId);
      }
      attempts++;
    }, 100); // Verifica a cada 100ms

    return () => clearInterval(intervalId);
  }, [steps]);

  useEffect(() => {
    console.log("Ready state changed: ", ready);
    if (ready) {
      setRun(true);
      console.log("All elements are ready, starting onboarding");
    }
  }, [ready]);

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (data[index].answer === ans) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
        setTotalCost(prev => prev + data[index].cost);
        setCostData(prev => [...prev, { question: data[index].question, cost: data[index].cost, referenceCost: data[index].referenceCost }]);
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
    setTotalCost(0);
    setCostData([]);

    option_array.forEach(option => {
      option.current.classList.remove('wrong');
      option.current.classList.remove('correct');
    });
  };

  return (
    <div className='container'>
      {ready && (
        <Onboarding 
          steps={steps} 
          run={run} 
          onTourEnd={() => {
            console.log("Onboarding tour ended");
            setRun(false);
          }}
        />
      )}
      {showScore ? (
        <Result score={score} totalQuestions={data.length} restartQuiz={restartQuiz} totalCost={totalCost} costData={costData} />
      ) : (
        <>
          <Header restartQuiz={restartQuiz} />
          <hr />
          <Question
            question={data[index].question}
            options={data[index].options}
            checkAns={checkAns}
            optionRefs={option_array}
          />
          <button className="next-button" onClick={next}>Next</button>
          <ProgressBar index={index} total={data.length} />
        </>
      )}
    </div>
  );
};

export default Quiz;
