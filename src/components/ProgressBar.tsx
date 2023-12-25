import React from 'react';

interface ProgressBarProps {
  value: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, maxValue }) => {
  const progress = (value / maxValue) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${Math.round(progress)}%` }}
      >
        <p className="m-x-1">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
