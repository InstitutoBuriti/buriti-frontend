// cypress/support/e2e.js
import 'cypress-localstorage-commands';
import '@testing-library/cypress/add-commands';

// Ignora erros de importação de módulos do Vite
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("does not provide an export named 'default'")) {
    return false;
  }
  return true;
});

