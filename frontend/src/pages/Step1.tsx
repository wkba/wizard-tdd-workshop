import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { WizardData } from '../types';

function Step1() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem('wizardData');
    if (saved) {
      const data: WizardData = JSON.parse(saved);
      setName(data.name || '');
      setEmail(data.email || '');
      setPhone(data.phone || '');
    }
  }, []);

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = '氏名を入力してください';
    if (!email.trim()) e.email = 'メールアドレスを入力してください';
    if (!phone.trim()) e.phone = '電話番号を入力してください';
    return e;
  }

  function handleNext(): void {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const saved = sessionStorage.getItem('wizardData');
    const data: WizardData = saved ? JSON.parse(saved) : { name: '', email: '', phone: '', plan: '' };
    data.name = name;
    data.email = email;
    data.phone = phone;
    sessionStorage.setItem('wizardData', JSON.stringify(data));
    navigate('/step2');
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>個人情報</Typography>
        <Stack spacing={2}>
          <TextField
            label="氏名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="山田 太郎"
            fullWidth
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="taro@example.com"
            fullWidth
          />
          <TextField
            label="電話番号"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
