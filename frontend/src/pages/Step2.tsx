import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import type { Plan, WizardData } from '../types';
import './Steps.css';

const PLANS: Plan[] = [
  { id: 'basic', name: 'ベーシック', price: '¥980/月', description: '個人利用に最適' },
  { id: 'standard', name: 'スタンダード', price: '¥1,980/月', description: 'チームでの利用に' },
  { id: 'premium', name: 'プレミアム', price: '¥4,980/月', description: '大規模組織向け' },
];

function Step2(): React.ReactElement {
  const history = useHistory();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('wizardData');
    if (saved) {
      const data: WizardData = JSON.parse(saved);
      setSelectedPlan(data.plan || '');
    }
  }, []);

  function handleNext(): void {
    if (!selectedPlan) {
      setError('プランを選択してください');
      return;
    }
    const saved = sessionStorage.getItem('wizardData');
    const data: WizardData = saved ? JSON.parse(saved) : { name: '', email: '', phone: '', plan: '' };
    data.plan = selectedPlan;
    sessionStorage.setItem('wizardData', JSON.stringify(data));
    history.push('/step3');
  }

  return (
    <div>
      <StepIndicator currentStep={2} />
      <div className="step-card">
        <h2 className="step-card__title">プラン選択</h2>
        <div className="step-card__plans">
          {PLANS.map((plan) => {
            let className = 'step-card__plan';
            if (selectedPlan === plan.id) {
              className += ' step-card__plan--selected';
            }
            return (
              <div
                key={plan.id}
                className={className}
                onClick={() => { setSelectedPlan(plan.id); setError(''); }}
              >
                <div className="step-card__plan-name">{plan.name}</div>
                <div className="step-card__plan-price">{plan.price}</div>
                <div className="step-card__plan-desc">{plan.description}</div>
              </div>
            );
          })}
        </div>
        {error && <p className="step-card__error">{error}</p>}
        <div className="step-card__actions">
          <button className="step-card__button" onClick={() => history.push('/step1')}>戻る</button>
          <button className="step-card__button step-card__button--primary" onClick={handleNext}>
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
