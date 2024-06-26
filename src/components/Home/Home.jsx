import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';

const Home = ({ onLogin }) => {
  return (
    <div className='home-container'>
      <div className='content'>
        <h1>Bem-vindo ao Simulador de Entrega de Água</h1>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
};

Home.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Home;
