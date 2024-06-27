// Question.js
import React from 'react';

const Question = ({ question, options, checkAns, optionRefs }) => {
  return (
    <>
      <div className='question-container'>
        <h2>{question}</h2>
      </div>
      <ul className='options-container'>
        {options.map((option, i) => (
          <li key={i} ref={optionRefs[i]} onClick={(e) => checkAns(e, i)}>
            {option}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Question;
