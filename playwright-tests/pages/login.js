const { expect } = require("playwright/test");

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
  }

  async preencheDadosIniciaisCadastro(dadosCadastro){
    console.log(dadosCadastro.nome)
    console.log(dadosCadastro.email)
    await this.usuarioCadastro.fill(dadosCadastro.nome);
    await this.emailCadastro.fill(dadosCadastro.email);
    await this.botaoCadastro.click();
  }

  async realizaLogin(usuario, senha) {
    await this.usuarioLogin.fill(usuario);
    await this.senhaLogin.fill(senha);
    await this.botaoLogin.click();
  }
}

module.exports = { PaginaLogin };
