const { expect } = require("playwright/test");
const { faker } = require('@faker-js/faker');

class PaginaLogin {
  constructor(page) {
    this.page = page;
    this.usuarioLogin = page.getByTestId('login-email');
    this.senhaLogin = page.getByTestId('login-password');
    this.botaoLogin = page.getByRole('button', { name: 'Login' });
    this.usuarioCadastro = page.getByTestId('signup-name');
    this.emailCadastro = page.getByTestId('signup-email');
    this.botaoCadastro = page.getByRole('button', { name: 'Signup' });
  }

  async acessaPaginaLogin() {
    await this.page.goto('/login');
    await expect(this.page).toHaveURL('login');
  }

  async preencheDadosIniciaisCadastro(dadosCadastro){
    const emailAleatorio = faker.internet.email();
    await this.usuarioCadastro.fill(dadosCadastro.nome);
    await this.emailCadastro.fill(emailAleatorio);
    await this.botaoCadastro.click();
    await expect(this.page).toHaveURL('signup');
  }

  async realizaLogin(usuario, senha) {
    await this.usuarioLogin.fill(usuario);
    await this.senhaLogin.fill(senha);
    await this.botaoLogin.click();
    await expect(this.page.getByText('Products')).toBeVisible();
  }
}

module.exports = { PaginaLogin };
