import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import './Steps.css';

var PLAN_LABELS = {
  basic: 'ベーシック（¥980/月）',
  standard: 'スタンダード（¥1,980/月）',
  premium: 'プレミアム（¥4,980/月）',
};

function Step3() {
  var history = useHistory();
  var [data, setData] = useState({});

  useEffect(function () {
    var saved = sessionStorage.getItem('wizardData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

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
        <div className="step-card__confirm-row">
          <div className="step-card__confirm-label">氏名</div>
          <div className="step-card__confirm-value">{data.name || '-'}</div>
        </div>
        <div className="step-card__confirm-row">
          <div className="step-card__confirm-label">メールアドレス</div>
          <div className="step-card__confirm-value">{data.email || '-'}</div>
        </div>
        <div className="step-card__confirm-row">
          <div className="step-card__confirm-label">電話番号</div>
          <div className="step-card__confirm-value">{data.phone || '-'}</div>
        </div>
        <div className="step-card__confirm-row">
          <div className="step-card__confirm-label">プラン</div>
          <div className="step-card__confirm-value">
            {PLAN_LABELS[data.plan] || '-'}
          </div>
        </div>
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
