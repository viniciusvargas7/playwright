// @ts-check
const { test, expect } = require('@playwright/test');
const { PaginaLogin } = require('../pages/login');
const { PaginaCadastro } = require('../pages/cadastro');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'fixtures', 'dados.json');
const fileData = fs.readFileSync(filePath, 'utf8');
const dadosLogin = JSON.parse(fileData);

test('Deve cadastrar novo usuário e em seguida deleta-lo', async ({page}) => {
  const paginaLogin = new PaginaLogin(page);
  const paginaCadastro = new PaginaCadastro(page);
  const dadosNovoUsuario = dadosLogin.dadosNovoUsuario;

  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.preencheDadosIniciaisCadastro(dadosNovoUsuario);
  await paginaCadastro.preencheDadosCadastro(dadosNovoUsuario);  
  await paginaCadastro.validaLogin(dadosNovoUsuario);
  await paginaCadastro.deletaConta();
})



test('Deve realizar login com sucesso', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  //await expect(page).toHaveURL('login');
  await paginaLogin.realizaLogin(dadosLogin.usuarioSucesso.usuario, dadosLogin.usuarioSucesso.senha);
});
