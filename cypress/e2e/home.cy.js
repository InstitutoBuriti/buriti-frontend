describe('Home Page', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    // Limpa qualquer redirecionamento inicial
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('deve carregar a homepage e exibir o título', () => {
    cy.visit('/');
    // Aguarda o carregamento básico
    cy.get('body').should('not.be.empty');
    // Verifica a URL e log
    cy.url().then(url => console.log('Visited URL:', url));
    cy.get('body').then($body => console.log('DOM:', $body.html()));
    // Verifica o título dentro do Home
    cy.contains('Cursos em Destaque', { timeout: 20000 }).should('be.visible');
    cy.get('[data-testid="cursos-destaque"]', { timeout: 20000 }).should('be.visible');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
