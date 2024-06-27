import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import Logo from '../../assets/logos/logo-w.svg';
import Quiz from '../Quiz/Quiz'; // Importe o componente Quiz diretamente

const Home = ({ onLogin }) => {
  const [text, setText] = useState('');
  const [startQuiz, setStartQuiz] = useState(false); // Estado para iniciar o quiz
  const fullText = 'Simulador de distribuição.';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prevText) => prevText + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval); // Clean up interval if the component unmounts
  }, [fullText]);

  const handleStartQuiz = () => {
    setStartQuiz(true);
    console.log("start quiz is true");
  };

  return (
    <div className='home-container'>
      {startQuiz ? (
        <Quiz />
      ) : (
        <div className='content'>
          <div className='logo-container'>
            <img src={Logo} alt="Logo" className='logo' />
          </div>
          <h1>{text}<span className="caret"></span></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis justo id fermentum cursus. Duis venenatis, erat vel molestie vestibulum, urna tortor ornare lectus, ac euismod nunc lacus et libero.</p>
          <button onClick={handleStartQuiz}>Fazer uma simulação.</button>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Home;
