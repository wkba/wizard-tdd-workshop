import React from 'react';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import './Steps.css';

function Step3() {
  var history = useHistory();

  function handleSubmit() {
    history.push('/step4');
  }

  function handleBack() {
    history.push('/step2');
  }

  return (
    <div>
      <StepIndicator currentStep={3} />
      <div className="step-card">
        <h2 className="step-card__title">入力内容の確認</h2>
        <p className="step-card__placeholder">（確認画面 - sessionStorage 連携後に表示）</p>
        <div className="step-card__actions">
          <button className="step-card__button" onClick={handleBack}>戻る</button>
          <button className="step-card__button step-card__button--primary" onClick={handleSubmit}>
            申し込む
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
