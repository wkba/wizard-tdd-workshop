import { Given } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

import { Before, After } from '@cucumber/cucumber';

Before(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser.close();
});

Given('個人情報を入力済みの状態でプラン選択画面を開いている', async () => {
  await page.goto('http://localhost:3000/step1');
  await page.evaluate(() => {
    sessionStorage.setItem('wizardData', JSON.stringify({
      name: '山田 太郎',
      email: 'taro@example.com',
      phone: '090-1234-5678',
      plan: '',
    }));
  });
  await page.goto('http://localhost:3000/step2');
});
