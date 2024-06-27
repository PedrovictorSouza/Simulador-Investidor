import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import Logo from '../../assets/logos/logo-w.svg';
import Quiz from '../Quiz/Quiz'; // Importe o componente Quiz diretamente

const Home = ({ onLogin }) => {
  const [text, setText] = useState('');
  const [startQuiz, setStartQuiz] = useState(false); // Estado para iniciar o quiz
  const [name, setName] = useState(''); // Estado para o input de texto
  const [neighborhood, setNeighborhood] = useState(''); // Estado para o select
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
    if (name && neighborhood) {
      setStartQuiz(true);
      console.log("start quiz is true");
    }
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
          <div className='input-container'>
            <input
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`input-text ${name && 'input-text-active'}`}
            /><br />
            <small className='accessibility-text'>Insira seu nome no campo acima.</small><br />
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className={`input-select ${neighborhood && 'input-select-active'}`}
            >
              <option value="" disabled>Escolher bairro</option>
              <option value="Bairro 1">Bairro 1</option>
              <option value="Bairro 2">Bairro 2</option>
              <option value="Bairro 3">Bairro 3</option>
              <option value="Bairro 4">Bairro 4</option>
            </select><br />
            <small className='accessibility-text'>Escolha seu bairro de atuação no campo acima.</small>
          </div>
          <button
            onClick={handleStartQuiz}
            className={`main-button ${name && neighborhood ? 'active' : 'inactive'}`}
            disabled={!name || !neighborhood}
          >
            {name && neighborhood ? 'Fazer Simulação' : <i className="fas fa-lock"></i>}
          </button>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Home;
