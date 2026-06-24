// @ts-check
const { test, expect } = require('@playwright/test');
const { PaginaLogin } = require('../pages/login');
const { PaginaCadastro } = require('../pages/cadastro');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'fixtures', 'dados.json');
const fileData = fs.readFileSync(filePath, 'utf8');
const dadosLogin = JSON.parse(fileData);

test('Deve cadastrar novo usuário', async ({page}) => {
  const paginaLogin = new PaginaLogin(page);
  const paginaCadastro = new PaginaCadastro(page);
  const dadosNovoUsuario = dadosLogin.dadosNovoUsuario;

  await paginaLogin.acessaPaginaLogin();
  await expect(page).toHaveURL('login');
  await paginaLogin.preencheDadosIniciaisCadastro(dadosNovoUsuario);
  await expect(page).toHaveURL('signup');
  await paginaCadastro.preencheDadosCadastro(dadosNovoUsuario);
  await expect(page).toHaveURL('account_created');
  await expect(page.getByText('Account Created!')).toBeVisible();
})



test('Deve realizar login com sucesso', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  await expect(page).toHaveURL('login');
  await paginaLogin.realizaLogin(dadosLogin.usuarioSucesso.usuario, dadosLogin.usuarioSucesso.senha);
  await expect(page.getByText('Products')).toBeVisible();
});
