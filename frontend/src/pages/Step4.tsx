import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

function Step4() {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />
          <Typography variant="h6">申し込み完了</Typography>
          <Typography color="text.secondary">
            お申し込みありがとうございます。確認メールをお送りしました。
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Step4;
