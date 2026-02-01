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
/* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    // 💡 ここを true に変更。すでに 3001番で動いているなら、それをそのまま使う設定
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});