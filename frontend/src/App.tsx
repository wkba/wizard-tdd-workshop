import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import { useLocation } from 'react-router-dom';

const STEPS = ['個人情報', 'プラン選択', '確認', '完了'];

function getActiveStep(pathname: string): number {
  if (pathname.startsWith('/step1')) return 0;
  if (pathname.startsWith('/step2')) return 1;
  if (pathname.startsWith('/step3')) return 2;
  if (pathname.startsWith('/step4')) return 3;
  return 0;
}

function App() {
  const location = useLocation();
  const activeStep = getActiveStep(location.pathname);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        申し込みウィザード
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Routes>
        <Route path="/" element={<Navigate to="/step1" replace />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
      </Routes>
    </Container>
  );
}

export default App;
