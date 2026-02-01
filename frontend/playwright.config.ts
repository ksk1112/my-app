import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* 1. URLを3001番に変更（page.goto('/') で済むようになります） */
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* CIの時間を短縮したい場合は、最初は chromium 以外をコメントアウトしてもOKです */
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* 2. ここが最重要：GitHub Actions上でアプリを自動起動させる設定 */
  webServer: {
    command: 'npm run dev',        // テスト前に叩くコマンド
    url: 'http://localhost:3001',   // ここにアクセスできるようになるまでテストを待機する
    reuseExistingServer: !process.env.CI, // ローカル（手元）では二重起動しない
    timeout: 120 * 1000,           // 起動に最大2分待つ
  },
});