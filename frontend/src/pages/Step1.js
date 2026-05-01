import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import './Steps.css';

function Step1() {
  var history = useHistory();
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [phone, setPhone] = useState('');
  var [errors, setErrors] = useState({});

  useEffect(function () {
    var saved = sessionStorage.getItem('wizardData');
    if (saved) {
      var data = JSON.parse(saved);
      setName(data.name || '');
      setEmail(data.email || '');
      setPhone(data.phone || '');
    }
  }, []);

  function validate() {
    var newErrors = {};
    if (!name.trim()) newErrors.name = '氏名を入力してください';
    if (!email.trim()) newErrors.email = 'メールアドレスを入力してください';
    if (!phone.trim()) newErrors.phone = '電話番号を入力してください';
    return newErrors;
  }

  function handleNext() {
    var newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    var saved = sessionStorage.getItem('wizardData');
    var data = saved ? JSON.parse(saved) : {};
    data.name = name;
    data.email = email;
    data.phone = phone;
    sessionStorage.setItem('wizardData', JSON.stringify(data));
    history.push('/step2');
  }

  return (
    <div>
      <StepIndicator currentStep={1} />
      <div className="step-card">
        <h2 className="step-card__title">個人情報</h2>
        <div className="step-card__field">
          <label className="step-card__label">氏名</label>
          <input
            className="step-card__input"
            type="text"
            value={name}
            onChange={function (e) { setName(e.target.value); }}
            placeholder="山田 太郎"
          />
          {errors.name && <p className="step-card__error">{errors.name}</p>}
        </div>
        <div className="step-card__field">
          <label className="step-card__label">メールアドレス</label>
          <input
            className="step-card__input"
            type="email"
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
            placeholder="taro@example.com"
          />
          {errors.email && <p className="step-card__error">{errors.email}</p>}
        </div>
        <div className="step-card__field">
          <label className="step-card__label">電話番号</label>
          <input
            className="step-card__input"
            type="tel"
            value={phone}
            onChange={function (e) { setPhone(e.target.value); }}
            placeholder="090-1234-5678"
          />
          {errors.phone && <p className="step-card__error">{errors.phone}</p>}
        </div>
        <div className="step-card__actions">
          <button className="step-card__button step-card__button--primary" onClick={handleNext}>
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1;
