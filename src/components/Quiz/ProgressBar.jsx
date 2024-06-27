// ProgressBar.js
import React from 'react';

const ProgressBar = ({ index, total }) => {
  const progress = ((index + 1) / total) * 100;

  return (
    <div className='progress-bar'>
      <div className='progress' style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
