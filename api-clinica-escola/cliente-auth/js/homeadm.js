const API = "http://localhost:3000";

const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));

const resultado = document.getElementById("resultado");

document.getElementById("usuario-logado").textContent =
    `Administrador: ${usuario.nome}`;

// =======================
// Cabeçalhos das requisições
// =======================

function getHeaders(json = false) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    if (json) {
        headers["Content-Type"] = "application/json";
    }

    return headers;
}

// =======================
// Logout
// =======================

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "index.html";
});

// =======================
// Função auxiliar
// =======================

function mostrarResultado(dados) {
    resultado.textContent = JSON.stringify(dados, null, 2);
}

// =======================
// Listar usuários
// =======================

document
    .getElementById("listarUsuarios")
    .addEventListener("click", listarUsuarios);

async function listarUsuarios() {

    try {

        const response = await fetch(`${API}/usuarios`, {
            headers: getHeaders(),
        });

        const dados = await response.json();

        mostrarResultado(dados);

    } catch (erro) {

        mostrarResultado({
            erro: erro.message,
        });

    }

}

// =======================
// Cadastrar usuário
// =======================

document
    .getElementById("formCadastro")
    .addEventListener("submit", cadastrarUsuario);

async function cadastrarUsuario(event) {

    event.preventDefault();

    const form = event.target;

    const dados = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value,
        perfil: form.perfil.value,
    };

    try {

        const response = await fetch(`${API}/usuarios`, {

            method: "POST",

            headers: getHeaders(true),

            body: JSON.stringify(dados),

        });

        const resposta = await response.json();

        mostrarResultado(resposta);

        if (response.ok) {
            form.reset();
        }

    } catch (erro) {

        mostrarResultado({
            erro: erro.message,
        });

    }

}

// =======================
// Atualizar usuário
// =======================

document
    .getElementById("formAtualizar")
    .addEventListener("submit", atualizarUsuario);

async function atualizarUsuario(event) {

    event.preventDefault();

    const form = event.target;

    const id = form.id.value;

    const dados = {};

    if (form.nome.value)
        dados.nome = form.nome.value;

    if (form.email.value)
        dados.email = form.email.value;

    if (form.senha.value)
        dados.senha = form.senha.value;

    if (form.perfil.value)
        dados.perfil = form.perfil.value;

    try {

        const response = await fetch(`${API}/usuarios/${id}`, {

            method: "PATCH",

            headers: getHeaders(true),

            body: JSON.stringify(dados),

        });

        const resposta = await response.json();

        mostrarResultado(resposta);

        if (response.ok) {
            form.reset();
        }

    } catch (erro) {

        mostrarResultado({
            erro: erro.message,
        });

    }

}

// =======================
// Inativar usuário
// =======================

document
    .getElementById("formInativar")
    .addEventListener("submit", inativarUsuario);

async function inativarUsuario(event) {

    event.preventDefault();

    const form = event.target;

    const id = form.id.value;

    try {

        const response = await fetch(`${API}/usuarios/${id}/inativar`, {

            method: "PATCH",

            headers: getHeaders(),

        });

        const resposta = await response.json();

        mostrarResultado(resposta);

        if (response.ok) {
            form.reset();
        }

    } catch (erro) {

        mostrarResultado({
            erro: erro.message,
        });

    }

}