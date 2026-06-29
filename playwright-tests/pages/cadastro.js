const { expect } = require("playwright/test");

class PaginaCadastro {
  constructor(page) {
    this.page = page;
    this.novaSenha = page.getByRole('textbox', {name: 'password'});
    this.diaNascimento = page.locator('select[name="days"]');
    this.mesNascimento = page.locator('select[name="months"]');
    this.anoNascimento = page.locator('select[name="years"]');
    this.checkboxNewsletter = page.getByRole('checkbox', {name: 'newsletter'});
    this.nome = page.getByRole('textbox', {name: 'First name'});
    this.sobrenome = page.getByRole('textbox', {name: 'Last name'});
    this.logradouro = page.getByTestId('address');
    this.complemento = page.getByTestId('address2');
    this.pais = page.getByTestId('country');
    this.estado = page.getByRole('textbox', {name: 'State'});
    this.cidade = page.getByRole('textbox', {name: 'City'});
    this.cep = page.getByTestId('zipcode');
    this.telefone = page.getByRole('textbox', {name: 'Mobile Number'});
    this.botaoCadastraUsuario = page.getByRole('button', {name: 'Create Account'})
    this.botaoContinuarLogin = page.getByRole('link', {name: 'Continue'});
    this.linkDeletaConta = page.getByRole('link', {name: 'Delete Account'});
  }

  radioPronome(labelPronome) {
    return this.page.getByLabel(labelPronome, { exact: false });
  }

  async preencheDadosCadastro(dadosCadastro){
    await this.radioPronome(dadosCadastro.pronome).click();
    await this.novaSenha.fill(dadosCadastro.senha);
    await this.diaNascimento.selectOption(dadosCadastro.dia);
    await this.mesNascimento.selectOption(dadosCadastro.mes);
    await this.anoNascimento.selectOption(dadosCadastro.ano);
    await this.checkboxNewsletter.check();
    await this.nome.fill(dadosCadastro.nome);
    await this.sobrenome.fill(dadosCadastro.sobrenome);
    await this.logradouro.fill(dadosCadastro.logradouro);
    await this.complemento.fill(dadosCadastro.complemento);
    await this.pais.selectOption(dadosCadastro.pais);
    await this.estado.fill(dadosCadastro.estado);
    await this.cidade.fill(dadosCadastro.cidade);
    await this.cep.fill(dadosCadastro.cep);
    await this.telefone.fill(dadosCadastro.telefone);
    await this.botaoCadastraUsuario.click();
    await expect(this.page).toHaveURL('account_created');
    await expect(this.page.getByText('Account Created!')).toBeVisible();
  }

  async validaLogin(dadosCadastro){
    await this.botaoContinuarLogin.click();
    await expect(this.page.getByText(`Logged in as ${dadosCadastro.nome}`)).toBeVisible();
  }

  async deletaConta(){
    await this.linkDeletaConta.click();
    await expect(this.page.getByText(/Account Deleted/)).toBeVisible();
  }
}

module.exports = { PaginaCadastro };
