import { test, expect } from '@playwright/test';

test.describe('ウィザード申し込み - バリデーション', () => {
  test('Step1: 未入力で「次へ」を押すとエラーメッセージが表示される', async ({ page }) => {
    await page.goto('/step1');

    await page.getByRole('button', { name: '次へ' }).click();

    await expect(page.getByText('氏名を入力してください')).toBeVisible();
    await expect(page.getByText('メールアドレスを入力してください')).toBeVisible();
    await expect(page.getByText('電話番号を入力してください')).toBeVisible();

    // エラーがある状態では Step2 に遷移しない
    await expect(page.getByText('個人情報')).toBeVisible();
  });

  test('Step1: 一部のみ入力した場合、未入力フィールドのみエラーが出る', async ({ page }) => {
    await page.goto('/step1');

    await page.getByLabel('氏名').fill('山田 太郎');
    await page.getByRole('button', { name: '次へ' }).click();

    await expect(page.getByText('氏名を入力してください')).not.toBeVisible();
    await expect(page.getByText('メールアドレスを入力してください')).toBeVisible();
    await expect(page.getByText('電話番号を入力してください')).toBeVisible();
  });

  test('Step2: プラン未選択で「次へ」を押すとエラーが表示される', async ({ page }) => {
    // Step1 をスキップするために sessionStorage を直接設定
    await page.goto('/step1');
    await page.evaluate(() => {
      sessionStorage.setItem('wizardData', JSON.stringify({
        name: '山田 太郎',
        email: 'taro@example.com',
        phone: '090-1234-5678',
        plan: '',
      }));
    });
    await page.goto('/step2');

    await page.getByRole('button', { name: '次へ' }).click();

    await expect(page.getByText('プランを選択してください')).toBeVisible();
  });
});
