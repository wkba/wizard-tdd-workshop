import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useWizard } from '../hooks/useWizard';

function Step1() {
  const navigate = useNavigate();
  const { data, update } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = '氏名を入力してください';
    if (!data.email.trim()) e.email = 'メールアドレスを入力してください';
    if (!data.phone.trim()) e.phone = '電話番号を入力してください';
    return e;
  }

  function handleNext(): void {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    navigate('/step2');
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>個人情報</Typography>
        <Stack spacing={2}>
          <TextField
            label="氏名"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="山田 太郎"
            fullWidth
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="taro@example.com"
            fullWidth
          />
          <TextField
            label="電話番号"
            type="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="090-1234-5678"
            fullWidth
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button variant="contained" onClick={handleNext}>次へ</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Step1;
