const { expect } = require("playwright/test");

class PaginaLogin {
    constructor(page){
        this.page = page;
        this.usuario = page.getByRole('textbox', {name: 'Username'});
        this.senha = page.getByRole('textbox', {name: 'Password'});
        this.botaoLogin = page.getByRole("button", {value: "Login"})
    }

    async acessaPaginaLogin () {
        await this.page.goto('/')
    }

    async realizaLogin (usuario, senha){
        await this.usuario.fill(usuario);
        await this.senha.fill(senha);
        await this.botaoLogin.click();
    }
}

module.exports = {PaginaLogin};