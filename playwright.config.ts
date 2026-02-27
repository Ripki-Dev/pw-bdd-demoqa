import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
import * as dotenv from 'dotenv';

dotenv.config();

const environments = ['DEV', 'STG', 'PRD'] as const;
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['features/steps/**/*.ts', 'features/support/**/*.ts'],
});

export default defineConfig({
  timeout: 30000,
  testDir,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
      externalAttachments: true,
    }),
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],
  use: {
    trace: 'retain-on-failure',
    headless: process.env.CI ? true : false,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: environments.map(env => ({
  name: env,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env[`BASE_URL_${env}`],
    viewport: { width: 1366, height: 768 }
  }
  }))
});
