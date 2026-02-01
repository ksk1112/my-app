import { test, expect } from '@playwright/test';

test('計算機が10+5=15を計算できるか', async ({ page }) => {
  // 1. 自分のアプリ（3001番）を開く
  await page.goto('http://localhost:3001');

  // 2. 1つ目の入力欄に 10 を入れる
  await page.locator('input').first().fill('10');
  // 3. 2つ目の入力欄に 5 を入れる
  await page.locator('input').last().fill('5');

  // 4. 計算ボタン（またはbuttonタグ）をクリック
// 修正前: await page.getByRole('button').click();
// 修正後: 名前を指定してボタンを特定する
await page.getByRole('button', { name: 'Goで計算を実行' }).click();

  // 5. 画面に「15」という文字が出るのをロボットが確認
  await expect(page.locator('text=15')).toBeVisible();
});