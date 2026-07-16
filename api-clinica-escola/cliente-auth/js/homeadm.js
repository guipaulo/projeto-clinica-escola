const API_USUARIOS = "http://localhost:3000/usuarios";

const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

const elementos = {
  usuarioLogado: document.getElementById("usuario-logado"),
  logout: document.getElementById("logout"),
  formCadastro: document.getElementById("formCadastro"),
  listarUsuarios: document.getElementById("listarUsuarios"),
  pesquisa: document.getElementById("pesquisa"),
  corpoTabela: document.getElementById("corpoTabela"),
  cardEditar: document.getElementById("cardEditar"),
  formEditar: document.getElementById("formEditar"),
  cancelarEdicao: document.getElementById("cancelarEdicao"),
  resultado: document.getElementById("resultado"),
};

let usuariosCache = [];

if (!token || !usuario || usuario.perfil !== "admin") {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.replace("index.html");
} else {
  iniciarPainel();
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function requisicao(caminho = "", opcoes = {}) {
  const resposta = await fetch(`${API_USUARIOS}${caminho}`, {
    ...opcoes,
    headers: { ...getHeaders(), ...(opcoes.headers || {}) },
  });

  const corpo = resposta.status === 204
    ? null
    : await resposta.json().catch(() => ({}));

  if (resposta.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.replace("index.html");
    throw new Error("Sua sessão expirou. Faça login novamente.");
  }

  if (!resposta.ok) {
    const mensagem = Array.isArray(corpo?.message)
      ? corpo.message.join(" ")
      : corpo?.message || "Não foi possível concluir a operação.";
    throw new Error(mensagem);
  }

  return corpo;
}

function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mostrarResultado(mensagem, tipo = "sucesso") {
  elementos.resultado.textContent = mensagem;
  elementos.resultado.className = `mensagem ${tipo}`;
}

function iniciarPainel() {
  elementos.usuarioLogado.textContent = `${usuario.nome} (Administrador)`;

  elementos.logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
  });

  elementos.formCadastro.addEventListener("submit", cadastrarUsuario);
  elementos.listarUsuarios.addEventListener("click", carregarUsuarios);
  elementos.pesquisa.addEventListener("input", filtrarUsuarios);
  elementos.formEditar.addEventListener("submit", salvarEdicao);
  elementos.cancelarEdicao.addEventListener("click", fecharEdicao);
  elementos.corpoTabela.addEventListener("click", tratarAcaoTabela);

  carregarUsuarios();
}

async function carregarUsuarios() {
  try {
    usuariosCache = await requisicao();
    renderizarTabela(usuariosCache);
    mostrarResultado("Lista de usuários carregada com sucesso.");
  } catch (erro) {
    mostrarResultado(erro.message, "erro");
  }
}

function renderizarTabela(lista) {
  if (lista.length === 0) {
    elementos.corpoTabela.innerHTML = `
      <tr><td colspan="7">Nenhum usuário encontrado.</td></tr>
    `;
    return;
  }

  elementos.corpoTabela.innerHTML = lista.map((item) => {
    const data = item.criadoEm
      ? new Date(item.criadoEm).toLocaleString("pt-BR")
      : "-";
    const acaoStatus = item.ativo ? "inativar" : "reativar";
    const textoStatus = item.ativo ? "Inativar" : "Reativar";
    const classeStatus = item.ativo ? "btn-inativar" : "btn-reativar";
    const proprioUsuario = item.id === usuario.id;

    return `
      <tr>
        <td>${item.id}</td>
        <td>${escaparHtml(item.nome)}</td>
        <td>${escaparHtml(item.email)}</td>
        <td>${escaparHtml(item.perfil)}</td>
        <td><span class="status ${item.ativo ? "status-ativo" : "status-inativo"}">${item.ativo ? "Ativo" : "Inativo"}</span></td>
        <td>${escaparHtml(data)}</td>
        <td class="acoes-tabela">
          <button type="button" class="btn-editar" data-acao="editar" data-id="${item.id}">Editar</button>
          <button type="button" class="${classeStatus}" data-acao="${acaoStatus}" data-id="${item.id}" ${proprioUsuario ? "disabled title=\"Você não pode alterar seu próprio status nesta tela\"" : ""}>${textoStatus}</button>
        </td>
      </tr>
    `;
  }).join("");
}

function filtrarUsuarios() {
  const termo = elementos.pesquisa.value.trim().toLowerCase();

  const filtrados = usuariosCache.filter((item) =>
    String(item.id).includes(termo) ||
    item.nome.toLowerCase().includes(termo) ||
    item.email.toLowerCase().includes(termo) ||
    item.perfil.toLowerCase().includes(termo) ||
    (item.ativo ? "ativo" : "inativo").includes(termo)
  );

  renderizarTabela(filtrados);
}

async function cadastrarUsuario(evento) {
  evento.preventDefault();
  const dados = Object.fromEntries(new FormData(evento.currentTarget).entries());

  try {
    await requisicao("", {
      method: "POST",
      body: JSON.stringify(dados),
    });
    evento.currentTarget.reset();
    await carregarUsuarios();
    mostrarResultado("Usuário cadastrado com sucesso.");
  } catch (erro) {
    mostrarResultado(erro.message, "erro");
  }
}

function abrirEdicao(id) {
  const item = usuariosCache.find((usuarioItem) => usuarioItem.id === id);
  if (!item) return;

  const form = elementos.formEditar.elements;
  form.id.value = item.id;
  form.nome.value = item.nome;
  form.email.value = item.email;
  form.senha.value = "";
  form.perfil.value = item.perfil;
  form.ativo.value = String(item.ativo);

  elementos.cardEditar.style.display = "block";
  elementos.cardEditar.scrollIntoView({ behavior: "smooth", block: "start" });
}

function fecharEdicao() {
  elementos.formEditar.reset();
  elementos.cardEditar.style.display = "none";
}

async function salvarEdicao(evento) {
  evento.preventDefault();
  const form = evento.currentTarget;
  const id = Number(form.elements.id.value);

  const dados = {
    nome: form.elements.nome.value.trim(),
    email: form.elements.email.value.trim(),
    perfil: form.elements.perfil.value,
    ativo: form.elements.ativo.value === "true",
  };

  const senha = form.elements.senha.value.trim();
  if (senha) dados.senha = senha;

  try {
    await requisicao(`/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dados),
    });
    fecharEdicao();
    await carregarUsuarios();
    mostrarResultado("Usuário atualizado com sucesso.");
  } catch (erro) {
    mostrarResultado(erro.message, "erro");
  }
}

async function alterarStatus(id, acao) {
  try {
    await requisicao(`/${id}/${acao}`, { method: "PATCH" });
    await carregarUsuarios();
    mostrarResultado(
      acao === "inativar"
        ? "Usuário inativado com sucesso."
        : "Usuário reativado com sucesso."
    );
  } catch (erro) {
    mostrarResultado(erro.message, "erro");
  }
}

function tratarAcaoTabela(evento) {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao || botao.disabled) return;

  const id = Number(botao.dataset.id);
  const acao = botao.dataset.acao;

  if (acao === "editar") {
    abrirEdicao(id);
    return;
  }

  if (acao === "inativar" || acao === "reativar") {
    alterarStatus(id, acao);
  }
}
