import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { useWizard } from '../hooks/useWizard';

const PLAN_LABELS: Record<string, string> = {
  basic: 'ベーシック（¥980/月）',
  standard: 'スタンダード（¥1,980/月）',
  premium: 'プレミアム（¥4,980/月）',
};

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" sx={{ py: 1.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ width: 140, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value || '-'}</Typography>
    </Stack>
  );
}

function Step3() {
  const navigate = useNavigate();
  const { data, clear } = useWizard();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
      clear();
      navigate('/step4');
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>入力内容の確認</Typography>
        <ConfirmRow label="氏名" value={data.name} />
        <Divider />
        <ConfirmRow label="メールアドレス" value={data.email} />
        <Divider />
        <ConfirmRow label="電話番号" value={data.phone} />
        <Divider />
        <ConfirmRow label="プラン" value={PLAN_LABELS[data.plan] || '-'} />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={() => navigate('/step2')} disabled={submitting}>戻る</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
            {submitting ? '送信中...' : '申し込む'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Step3;
