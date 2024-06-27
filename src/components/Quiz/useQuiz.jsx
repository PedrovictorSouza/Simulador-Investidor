import { useState, useRef, useEffect } from 'react';

const useQuiz = (initialNode, graph) => {
  const [currentNode, setCurrentNode] = useState(initialNode);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [ready, setReady] = useState(false);
  const [run, setRun] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  useEffect(() => {
    setShuffledOptions(shuffle([...graph[currentNode].options]));
  }, [currentNode, graph]);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    const intervalId = setInterval(() => {
      const allElementsPresent = steps.every(step => {
        const element = document.querySelector(step.target);
        return element;
      });
      if (allElementsPresent) {
        setReady(true);
        clearInterval(intervalId);
      }
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
      attempts++;
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (ready) {
      setRun(true);
    }
  }, [ready]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (graph[currentNode].answer === ans) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        optionArray[graph[currentNode].answer].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      const nextNodes = graph[currentNode].next;
      if (nextNodes.length === 0) {
        setResult(true);
        setShowScore(true);
        return;
      }
      const nextNode = nextNodes[Math.floor(Math.random() * nextNodes.length)];
      setCurrentNode(nextNode);
      setLock(false);

      optionArray.forEach(option => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  };

  const restartQuiz = () => {
    setCurrentNode(initialNode);
    setScore(0);
    setShowScore(false);
    setLock(false);
    setResult(false);

    optionArray.forEach(option => {
      option.current.classList.remove('wrong');
      option.current.classList.remove('correct');
    });
  };

  return {
    currentNode,
    score,
    showScore,
    lock,
    result,
    ready,
    run,
    shuffledOptions,
    optionArray,
    checkAns,
    next,
    restartQuiz,
    setRun
  };
};

export default useQuiz;
