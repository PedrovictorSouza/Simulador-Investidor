import React, { useEffect, useRef } from 'react';
import Joyride from 'react-joyride';

const Onboarding = ({ steps, run, onTourEnd }) => {
  const joyrideRef = useRef();

  useEffect(() => {
    // Simula que o primeiro clique já foi feito
    if (run && joyrideRef.current) {
      joyrideRef.current.helpers.next();
    }
  }, [run]);

  console.log('Onboarding component', { steps, run });

  // Verifique se os elementos alvo estão no DOM
  steps.forEach(step => {
    if (document.querySelector(step.target)) {
      console.log(`Element ${step.target} found in the DOM`);
    } else {
      console.warn(`Element ${step.target} not found in the DOM`);
    }
  });

  return (
    <Joyride
      ref={joyrideRef}
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      autoStart={true} // Inicia automaticamente
      scrollToFirstStep={true} // Rola para o primeiro passo automaticamente
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#00bfff', // Cor principal dos botões
          textColor: '#333', // Cor do texto
          backgroundColor: '#fff', // Cor de fundo da tooltip
          overlayColor: 'rgba(0, 0, 0, 0.5)', // Cor do overlay
        },
        tooltipContainer: {
          textAlign: 'left', // Alinhamento do texto na tooltip
          padding: '20px', // Padding da tooltip
        },
        tooltipTitle: {
          fontSize: '18px', // Tamanho da fonte do título
          fontWeight: 'bold', // Peso da fonte do título
        },
        buttonNext: {
          backgroundColor: '#00bfff', // Cor de fundo do botão "Next"
          color: '#fff'
        },
        buttonBack: {
          marginRight: 10
        },
        buttonSkip: {
          backgroundColor: 'transparent', // Cor de fundo do botão "Skip"
          color: '#999', // Cor do texto do botão "Skip"
        },
        buttonClose: {
          background: 'none', // Cor de fundo do botão "Close"
          color: 'black', // Cor do texto do botão "Close"
          borderRadius: '50%', // Faz o botão ser redondo
          boxShadow: 'none',
          width: '50px',
          textAlign: 'right',
          fontWeight: '600',
          padding: '5px',
          fontSize: '18pt',
          margin: '0px'// Remove qualquer sombra do botão
        },
      }}
      callback={(data) => {
        console.log('Joyride callback', data);
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
          onTourEnd();
        }
      }}
    />
  );
};

export default Onboarding;
