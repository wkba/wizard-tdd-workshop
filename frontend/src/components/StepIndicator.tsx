import React from 'react';
import './StepIndicator.css';

const STEPS = ['個人情報', 'プラン選択', '確認', '完了'];

interface StepIndicatorProps {
  currentStep: number;
}

function StepIndicator({ currentStep }: StepIndicatorProps): React.ReactElement {
  return (
    <div className="step-indicator">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        let className = 'step-indicator__item';
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
