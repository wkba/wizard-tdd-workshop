import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Step1 from './Step1';

function renderStep1() {
  return render(
    <MemoryRouter initialEntries={['/step1']}>
      <Step1 />
    </MemoryRouter>
  );
}

describe('Step1 - 個人情報', () => {
  it('氏名・メール・電話番号の入力欄が表示される', () => {
    renderStep1();

    expect(screen.getByLabelText('氏名')).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('電話番号')).toBeInTheDocument();
  });

  it('未入力で「次へ」を押すとエラーメッセージが表示される', async () => {
    renderStep1();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '次へ' }));

    expect(screen.getByText('氏名を入力してください')).toBeInTheDocument();
    expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument();
    expect(screen.getByText('電話番号を入力してください')).toBeInTheDocument();
  });

  it('全フィールドを入力すればエラーは表示されない', async () => {
    renderStep1();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('氏名'), '山田 太郎');
    await user.type(screen.getByLabelText('メールアドレス'), 'taro@example.com');
    await user.type(screen.getByLabelText('電話番号'), '090-1234-5678');
    await user.click(screen.getByRole('button', { name: '次へ' }));

    expect(screen.queryByText('氏名を入力してください')).not.toBeInTheDocument();
    expect(screen.queryByText('メールアドレスを入力してください')).not.toBeInTheDocument();
    expect(screen.queryByText('電話番号を入力してください')).not.toBeInTheDocument();
  });
});
