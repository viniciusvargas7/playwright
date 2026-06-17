// @ts-check
import { test, expect } from '@playwright/test';
import {PaginaLogin} from '../pages/login'
import fs from 'fs';
import path from 'path';

const filePath = path.join('./fixtures/dados.json');
const fileData = fs.readFileSync(filePath, 'utf8'); 
const dadosLogin = JSON.parse(fileData);

test('Realiza Login com sucesso com usuário padrão', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin(dadosLogin.usuarioSucesso.usuario, dadosLogin.usuarioSucesso.senha); //em um cenário real os dados de login não devem ser commitados juntos ao projeto de testes
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('Tenta realizar login com usuário bloqueado', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin(dadosLogin.usuarioBloqueado.usuario, dadosLogin.usuarioBloqueado.senha); //em um cenário real os dados de login não devem ser commitados juntos ao projeto de testes
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByText(/locked out/)).toBeVisible();
});

test('Tenta realizar login com senha incorreta', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin(dadosLogin.usuarioIncorreto.usuario, dadosLogin.usuarioIncorreto.senha); //em um cenário real os dados de login não devem ser commitados juntos ao projeto de testes
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByText(/Username and password do not match/)).toBeVisible();
});

