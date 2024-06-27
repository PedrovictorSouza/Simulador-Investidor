// src/App.jsx

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';
import './App.css';
import './styles/menu.css'; // Adicione este arquivo CSS para estilizar o menu

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      <button className={`menu-button ${menuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        ☰
      </button>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>×</button>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;
