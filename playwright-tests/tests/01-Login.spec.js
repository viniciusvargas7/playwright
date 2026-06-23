// @ts-check
const { test, expect } = require('@playwright/test');
const { PaginaLogin } = require('../pages/login');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'fixtures', 'dados.json');
const fileData = fs.readFileSync(filePath, 'utf8');
const dadosLogin = JSON.parse(fileData);

test('Realiza login com sucesso com usuario padrao', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);

  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin(
    dadosLogin.usuarioSucesso.usuario,
    dadosLogin.usuarioSucesso.senha,
  );

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('Tenta realizar login com usuario bloqueado', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);

  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin(
    dadosLogin.usuarioBloqueado.usuario,
    dadosLogin.usuarioBloqueado.senha,
  );

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByText(/locked out/)).toBeVisible();
});

test('Tenta realizar login com senha incorreta', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);

  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin(
    dadosLogin.usuarioIncorreto.usuario,
    dadosLogin.usuarioIncorreto.senha,
  );

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByText(/Username and password do not match/)).toBeVisible();
});
