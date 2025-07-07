import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Equivalente a __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Carrega variáveis de ambiente do .env.test
      const envPath = resolve(__dirname, process.env.NODE_ENV === 'test' ? '.env.test' : '.env');
      const envConfig = dotenv.config({ path: envPath }).parsed;

      // Adiciona as variáveis de ambiente carregadas à configuração do Cypress
      config.env = { ...config.env, ...envConfig };

      return config;
    },
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
