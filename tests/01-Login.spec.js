// @ts-check
import { test, expect } from '@playwright/test';
import {PaginaLogin} from '../pages/login'

test('Realiza Login com sucesso com usuário padrão', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('Tenta realizar login com usuário bloqueado', async ({ page }) => {
  const paginaLogin = new PaginaLogin(page);
  await paginaLogin.acessaPaginaLogin();
  await paginaLogin.realizaLogin('locked_out_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByText(/locked out/)).toBeVisible();
});

