import React from 'react';
import StepIndicator from '../components/StepIndicator';
import './Steps.css';

function Step4() {
  return (
    <div>
      <StepIndicator currentStep={4} />
      <div className="step-card">
        <h2 className="step-card__title">申し込み完了</h2>
        <p className="step-card__message">お申し込みありがとうございます。</p>
        <p className="step-card__message">確認メールをお送りしました。</p>
      </div>
    </div>
  );
}

export default Step4;
