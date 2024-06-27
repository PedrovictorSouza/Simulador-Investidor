// Header.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const Header = ({ restartQuiz }) => {
  return (
    <div className='header'>
      <h1>SIMULADOR | Entrega de água</h1>
      <button className='restart-button' onClick={restartQuiz}>
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export default Header;
