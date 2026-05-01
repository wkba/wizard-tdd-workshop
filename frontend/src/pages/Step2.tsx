import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useWizard } from '../hooks/useWizard';
import type { Plan } from '../types';

const PLANS: Plan[] = [
  { id: 'basic', name: 'ベーシック', price: '¥980/月', description: '個人利用に最適' },
  { id: 'standard', name: 'スタンダード', price: '¥1,980/月', description: 'チームでの利用に' },
  { id: 'premium', name: 'プレミアム', price: '¥4,980/月', description: '大規模組織向け' },
];

function Step2() {
  const navigate = useNavigate();
  const { data, update } = useWizard();
  const [error, setError] = useState('');

  function handleNext(): void {
    if (!data.plan) { setError('プランを選択してください'); return; }
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
                borderColor: data.plan === plan.id ? 'primary.main' : 'divider',
                borderWidth: data.plan === plan.id ? 2 : 1,
                bgcolor: data.plan === plan.id ? 'primary.50' : 'transparent',
              }}
            >
              <CardActionArea
                onClick={() => { update({ plan: plan.id }); setError(''); }}
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
