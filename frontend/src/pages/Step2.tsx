import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import type { Plan, WizardData } from '../types';

const PLANS: Plan[] = [
  { id: 'basic', name: 'ベーシック', price: '¥980/月', description: '個人利用に最適' },
  { id: 'standard', name: 'スタンダード', price: '¥1,980/月', description: 'チームでの利用に' },
  { id: 'premium', name: 'プレミアム', price: '¥4,980/月', description: '大規模組織向け' },
];

function Step2() {
  const navigate = useNavigate();
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
    if (!selectedPlan) { setError('プランを選択してください'); return; }
    const saved = sessionStorage.getItem('wizardData');
    const data: WizardData = saved ? JSON.parse(saved) : { name: '', email: '', phone: '', plan: '' };
    data.plan = selectedPlan;
    sessionStorage.setItem('wizardData', JSON.stringify(data));
    navigate('/step3');
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>プラン選択</Typography>
        <Stack spacing={2} sx={{ mb: 2 }}>
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              variant="outlined"
              sx={{
                borderColor: selectedPlan === plan.id ? 'primary.main' : 'divider',
                borderWidth: selectedPlan === plan.id ? 2 : 1,
                bgcolor: selectedPlan === plan.id ? 'primary.50' : 'transparent',
              }}
            >
              <CardActionArea
                onClick={() => { setSelectedPlan(plan.id); setError(''); }}
                sx={{ p: 2 }}
              >
                <Typography variant="subtitle1" fontWeight="bold">{plan.name}</Typography>
                <Typography variant="h6" color="primary">{plan.price}</Typography>
                <Typography variant="body2" color="text.secondary">{plan.description}</Typography>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={() => navigate('/step1')}>戻る</Button>
          <Button variant="contained" onClick={handleNext}>次へ</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Step2;
