import React from 'react';
import './StepIndicator.css';

const STEPS = ['個人情報', 'プラン選択', '確認', '完了'];

function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator">
      {STEPS.map(function (label, index) {
        var stepNumber = index + 1;
        var className = 'step-indicator__item';
        if (stepNumber === currentStep) {
          className += ' step-indicator__item--active';
        } else if (stepNumber < currentStep) {
          className += ' step-indicator__item--done';
        }
        return (
          <div key={stepNumber} className={className}>
            <div className="step-indicator__circle">{stepNumber}</div>
            <div className="step-indicator__label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
