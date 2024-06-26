// src/App.jsx

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className='app'>
      <CSSTransition
        in={!isLoggedIn}
        timeout={500}
        classNames='fade'
        unmountOnExit
      >
        <Home onLogin={handleLogin} />
      </CSSTransition>
      <CSSTransition
        in={isLoggedIn}
        timeout={500}
        classNames='fade'
        unmountOnExit
      >
        <Quiz />
      </CSSTransition>
    </div>
  );
};

export default App;
