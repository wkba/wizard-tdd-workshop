import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import type { WizardData } from '../types';
import './Steps.css';

const PLAN_LABELS: Record<string, string> = {
  basic: 'ベーシック（¥980/月）',
  standard: 'スタンダード（¥1,980/月）',
  premium: 'プレミアム（¥4,980/月）',
};

function Step3(): React.ReactElement {
  const history = useHistory();
  const [data, setData] = useState<WizardData>({ name: '', email: '', phone: '', plan: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('wizardData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  async function handleSubmit(): Promise<void> {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('申し込みに失敗しました');
      sessionStorage.removeItem('wizardData');
      history.push('/step4');
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      setSubmitting(false);
    }
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
        {error && <p className="step-card__error">{error}</p>}
        <div className="step-card__actions">
          <button className="step-card__button" onClick={() => history.push('/step2')} disabled={submitting}>
            戻る
          </button>
          <button
            className="step-card__button step-card__button--primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? '送信中...' : '申し込む'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
