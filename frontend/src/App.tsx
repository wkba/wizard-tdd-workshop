import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';

function App(): React.ReactElement {
  return (
    <div className="app">
      <h1 className="app__title">申し込みウィザード</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/step1" replace />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
      </Routes>
    </div>
  );
}

export default App;
