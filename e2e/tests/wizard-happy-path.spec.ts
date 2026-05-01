import { test, expect } from '@playwright/test';

test.describe('ウィザード申し込み - ハッピーパス', () => {
  test('全ステップを入力して申し込みが完了する', async ({ page }) => {
    // Step 1: 個人情報を入力
    await page.goto('/step1');
    await expect(page.getByText('個人情報')).toBeVisible();

    await page.getByLabel('氏名').fill('山田 太郎');
    await page.getByLabel('メールアドレス').fill('taro@example.com');
    await page.getByLabel('電話番号').fill('090-1234-5678');
    await page.getByRole('button', { name: '次へ' }).click();

    // Step 2: プランを選択
    await expect(page.getByText('プラン選択')).toBeVisible();
    await page.getByText('スタンダード').click();
    await page.getByRole('button', { name: '次へ' }).click();

    // Step 3: 入力内容を確認
    await expect(page.getByText('入力内容の確認')).toBeVisible();
    await expect(page.getByText('山田 太郎')).toBeVisible();
    await expect(page.getByText('taro@example.com')).toBeVisible();
    await expect(page.getByText('090-1234-5678')).toBeVisible();
    await expect(page.getByText('スタンダード（¥1,980/月）')).toBeVisible();

    await page.getByRole('button', { name: '申し込む' }).click();

    // Step 4: 完了
    await expect(page.getByText('申し込み完了')).toBeVisible();
    await expect(page.getByText('お申し込みありがとうございます')).toBeVisible();
  });
});
