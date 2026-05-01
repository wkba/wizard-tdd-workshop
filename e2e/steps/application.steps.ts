import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import * as assert from 'assert';

let browser: Browser;
let page: Page;

Before(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser.close();
});

Given('申し込みウィザードを開いている', async () => {
  await page.goto('http://localhost:3000/step1');
});

When('氏名に {string} と入力する', async (value: string) => {
  await page.getByLabel('氏名').fill(value);
});

When('メールアドレスに {string} と入力する', async (value: string) => {
  await page.getByLabel('メールアドレス').fill(value);
});

When('電話番号に {string} と入力する', async (value: string) => {
  await page.getByLabel('電話番号').fill(value);
});

When('「次へ」ボタンを押す', async () => {
  await page.getByRole('button', { name: '次へ' }).click();
});

When('{string} プランを選択する', async (planName: string) => {
  await page.getByText(planName, { exact: false }).first().click();
});

When('「申し込む」ボタンを押す', async () => {
  await page.getByRole('button', { name: '申し込む' }).click();
});

Then('確認画面に {string} が表示されている', async (text: string) => {
  await page.waitForSelector(`text=${text}`);
  const visible = await page.getByText(text).isVisible();
  assert.ok(visible, `"${text}" が確認画面に表示されていません`);
});

Then('{string} と表示される', async (text: string) => {
  await page.waitForSelector(`text=${text}`);
  const visible = await page.getByText(text).isVisible();
  assert.ok(visible, `"${text}" が表示されていません`);
});
