Cypress.Commands.add('acessaPaginaLogin', () => {
  cy.visit('/');
});

Cypress.Commands.add('preencheUsuario', (usuario) => {
  cy.get('[data-test="username"]').type(usuario);
});

Cypress.Commands.add('preencheSenha', (senha) => {
  cy.get('[data-test="password"]').type(senha, { log: false });
});

Cypress.Commands.add('clicaNoBotaoLogin', () => {
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('realizaLogin', ({ usuario, senha }) => {
  // O comando centraliza a interacao de login sem introduzir page objects.
  cy.preencheUsuario(usuario);
  cy.preencheSenha(senha);
  cy.clicaNoBotaoLogin();
});

Cypress.Commands.add('validaPaginaProdutos', () => {
  cy.url().should('include', '/inventory');
  cy.contains('Products').should('be.visible');
});

Cypress.Commands.add('validaErroDeLogin', (mensagem) => {
  cy.url().should('eq', 'https://www.saucedemo.com/');
  cy.contains(mensagem).should('be.visible');
});
