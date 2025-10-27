import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    // URL base para todos os testes
    baseURL: 'http://localhost:5173',

    // Captura screenshots em caso de falha
    trace: 'on-first-retry',
  },

  // Inicia o servidor de desenvolvimento do Vite antes dos testes
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});