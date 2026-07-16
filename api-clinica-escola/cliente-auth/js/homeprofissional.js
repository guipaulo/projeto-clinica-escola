const API = "http://localhost:3000";

const elementos = {
  usuarioLogado: document.getElementById("usuario-logado"),
  logout: document.getElementById("logout"),
  dadosProfissional: document.getElementById("dadosProfissional"),
  formProfissional: document.getElementById("formProfissional"),
  servicosProfissional: document.getElementById("servicosProfissional"),
  formHorario: document.getElementById("formHorario"),
  dataHorario: document.getElementById("dataHorario"),
  listaHorarios: document.getElementById("listaHorarios"),
  listaAtendimentos: document.getElementById("listaAtendimentos"),
  filtroStatus: document.getElementById("filtroStatus"),
  paginacao: document.getElementById("paginacao"),
  paginaAnterior: document.getElementById("paginaAnterior"),
  proximaPagina: document.getElementById("proximaPagina"),
  infoPagina: document.getElementById("infoPagina"),
  totalAgendados: document.getElementById("totalAgendados"),
  totalConcluidos: document.getElementById("totalConcluidos"),
  totalCancelados: document.getElementById("totalCancelados"),
  msg: document.getElementById("msg"),
};

const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

let profissionalAtual = null;
let profissionais = [];
let alunos = [];
let servicos = [];
let horarios = [];
let atendimentos = [];
let paginaAtual = 1;
const ITENS_POR_PAGINA = 8;

if (!usuario || !token || usuario.perfil !== "profissional") {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.replace("index.html");
} else {
  iniciar();
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API}${caminho}`, {
    ...opcoes,
    headers: { ...getHeaders(), ...(opcoes.headers || {}) },
  });

  if (resposta.status === 204) return null;
  const corpo = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    const mensagem = Array.isArray(corpo.message)
      ? corpo.message.join(" ")
      : corpo.message || "Não foi possível concluir a operação.";
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

function mostrarMensagem(texto, tipo = "sucesso") {
  elementos.msg.textContent = texto;
  elementos.msg.className = `mensagem ${tipo}`;
  elementos.msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function iniciar() {
  elementos.usuarioLogado.textContent = `${usuario.nome} (Profissional)`;
  elementos.dataHorario.min = new Date().toISOString().split("T")[0];
  registrarEventos();

  try {
    [profissionais, alunos, servicos, horarios] = await Promise.all([
      requisicao("/profissionais"),
      requisicao("/alunos"),
      requisicao("/servicos"),
      requisicao("/horarios"),
    ]);

    profissionalAtual = profissionais.find(
      (profissional) => profissional.email.toLowerCase() === usuario.email.toLowerCase()
    );

    if (!profissionalAtual) {
      throw new Error("Não foi encontrado um cadastro profissional para este usuário.");
    }

    preencherServicos();
    preencherFormularioProfissional();
    renderizarDadosProfissional();
    renderizarHorarios();
    await carregarAtendimentos();
  } catch (erro) {
    elementos.dadosProfissional.textContent = "Cadastro profissional não encontrado.";
    mostrarMensagem(erro.message, "erro");
  }
}

function registrarEventos() {
  elementos.logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
  });

  elementos.formProfissional.addEventListener("submit", atualizarProfissional);
  elementos.formHorario.addEventListener("submit", disponibilizarHorario);
  elementos.filtroStatus.addEventListener("change", () => {
    paginaAtual = 1;
    renderizarAtendimentos();
  });

  elementos.paginaAnterior.addEventListener("click", () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderizarAtendimentos();
    }
  });

  elementos.proximaPagina.addEventListener("click", () => {
    paginaAtual++;
    renderizarAtendimentos();
  });

  elementos.listaAtendimentos.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-status]");
    if (botao) atualizarStatus(Number(botao.dataset.id), botao.dataset.status);
  });

  elementos.listaHorarios.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-excluir-horario]");
    if (botao) excluirHorario(Number(botao.dataset.excluirHorario));
  });
}

function preencherServicos() {
  elementos.servicosProfissional.innerHTML = servicos
    .map((servico) => `<option value="${servico.id}">${escaparHtml(servico.nome)}</option>`)
    .join("");
}

function preencherFormularioProfissional() {
  const form = elementos.formProfissional.elements;
  form.name.value = profissionalAtual.name || "";
  form.email.value = profissionalAtual.email || "";
  form.phone.value = profissionalAtual.phone || "";
  form.registryCard.value = profissionalAtual.registryCard || "";
  form.specialty.value = profissionalAtual.specialty || "";

  Array.from(elementos.servicosProfissional.options).forEach((option) => {
    option.selected = profissionalAtual.servicesIds.includes(Number(option.value));
  });
}

function renderizarDadosProfissional() {
  const nomesServicos = servicos
    .filter((servico) => profissionalAtual.servicesIds.includes(servico.id))
    .map((servico) => servico.nome)
    .join(", ") || "Nenhum serviço informado";

  elementos.dadosProfissional.innerHTML = `
    <div><span>Nome</span><strong>${escaparHtml(profissionalAtual.name)}</strong></div>
    <div><span>Especialidade</span><strong>${escaparHtml(profissionalAtual.specialty || "Não informada")}</strong></div>
    <div><span>Registro</span><strong>${escaparHtml(profissionalAtual.registryCard || "Não informado")}</strong></div>
    <div><span>Serviços</span><strong>${escaparHtml(nomesServicos)}</strong></div>
    <div><span>Status</span><strong class="status ${profissionalAtual.ativo ? "ativo" : "cancelado"}">${profissionalAtual.ativo ? "Ativo" : "Inativo"}</strong></div>
  `;
}

async function atualizarProfissional(evento) {
  evento.preventDefault();
  if (!profissionalAtual) return;

  const form = evento.currentTarget.elements;
  const dados = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    registryCard: form.registryCard.value.trim(),
    specialty: form.specialty.value.trim(),
    servicesIds: Array.from(elementos.servicosProfissional.selectedOptions).map(
      (option) => Number(option.value)
    ),
  };

  try {
    profissionalAtual = await requisicao(`/profissionais/${profissionalAtual.id}`, {
      method: "PATCH",
      body: JSON.stringify(dados),
    });
    renderizarDadosProfissional();
    mostrarMensagem("Dados profissionais atualizados com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

function dataParaApi(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

async function disponibilizarHorario(evento) {
  evento.preventDefault();

  if (!profissionalAtual) {
    mostrarMensagem("Cadastro profissional não encontrado.", "erro");
    return;
  }

  const form = new FormData(evento.currentTarget);
  const dados = {
    profissionalId: profissionalAtual.id,
    data: dataParaApi(form.get("data")),
    horaInicio: form.get("horaInicio"),
    horaFim: form.get("horaFim"),
  };

  try {
    await requisicao("/horarios/disponibilizar", {
      method: "POST",
      body: JSON.stringify(dados),
    });
    evento.currentTarget.reset();
    await carregarHorarios();
    mostrarMensagem("Horário disponibilizado com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

async function carregarHorarios() {
  horarios = await requisicao("/horarios");
  renderizarHorarios();
}

function renderizarHorarios() {
  const disponiveis = horarios.filter(
    (horario) =>
      horario.status === "disponivel" &&
      horario.profissionalId === profissionalAtual?.id
  );

  if (disponiveis.length === 0) {
    elementos.listaHorarios.innerHTML = '<p class="estado-vazio">Não há horários disponíveis.</p>';
    return;
  }

  elementos.listaHorarios.innerHTML = disponiveis.map((horario) => `
    <article class="horario-item">
      <div>
        <strong>${escaparHtml(horario.data)}</strong>
        <span>${escaparHtml(horario.horaInicio)} às ${escaparHtml(horario.horaFim)}</span>
      </div>
      <button class="btn btn-sm btn-excluir" type="button" data-excluir-horario="${horario.id}">Excluir</button>
    </article>
  `).join("");
}

async function excluirHorario(id) {
  try {
    await requisicao(`/horarios/${id}`, { method: "DELETE" });
    await carregarHorarios();
    mostrarMensagem("Horário excluído com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

async function carregarAtendimentos() {
  atendimentos = await requisicao(`/atendimentos?profissionalId=${profissionalAtual.id}`);
  atualizarResumo();
  renderizarAtendimentos();
}

function atualizarResumo() {
  elementos.totalAgendados.textContent = atendimentos.filter((item) => item.status === "Agendado").length;
  elementos.totalConcluidos.textContent = atendimentos.filter((item) => item.status === "Concluido").length;
  elementos.totalCancelados.textContent = atendimentos.filter((item) => item.status === "Cancelado").length;
}

function renderizarAtendimentos() {
  const status = elementos.filtroStatus.value;
  const filtrados = (status
    ? atendimentos.filter((atendimento) => atendimento.status === status)
    : [...atendimentos]
  ).sort((a, b) => b.id - a.id);

  if (filtrados.length === 0) {
    elementos.listaAtendimentos.innerHTML = '<p class="estado-vazio">Nenhum atendimento encontrado.</p>';
    elementos.paginacao.hidden = true;
    return;
  }

  const totalPaginas = Math.ceil(filtrados.length / ITENS_POR_PAGINA);
  paginaAtual = Math.min(Math.max(paginaAtual, 1), totalPaginas);

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const atendimentosDaPagina = filtrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  elementos.listaAtendimentos.innerHTML = atendimentosDaPagina.map((atendimento) => {
    const aluno = alunos.find((item) => item.id === atendimento.alunoId);
    const servico = servicos.find((item) => item.id === atendimento.servicoId);
    const horario = horarios.find((item) => item.id === atendimento.horarioId);
    const podeAlterar = atendimento.status === "Agendado";

    return `
      <article class="atendimento-item">
        <div class="atendimento-info">
          <h3>${escaparHtml(servico?.nome || `Serviço ${atendimento.servicoId}`)}</h3>
          <p><strong>Aluno:</strong> ${escaparHtml(aluno?.nome || `ID ${atendimento.alunoId}`)}</p>
          <p><strong>Horário:</strong> ${horario ? `${escaparHtml(horario.data)} — ${escaparHtml(horario.horaInicio)} às ${escaparHtml(horario.horaFim)}` : `ID ${atendimento.horarioId}`}</p>
        </div>
        <div class="acoes">
          <span class="status ${atendimento.status.toLowerCase()}">${escaparHtml(atendimento.status)}</span>
          ${podeAlterar ? `
            <button class="btn btn-sm btn-concluir" type="button" data-id="${atendimento.id}" data-status="Concluido">Concluir</button>
            <button class="btn btn-sm btn-cancelar" type="button" data-id="${atendimento.id}" data-status="Cancelado">Cancelar</button>
          ` : ""}
        </div>
      </article>
    `;
  }).join("");

  elementos.paginacao.hidden = totalPaginas <= 1;
  elementos.infoPagina.textContent = `Página ${paginaAtual} de ${totalPaginas} — ${filtrados.length} atendimento(s)`;
  elementos.paginaAnterior.disabled = paginaAtual === 1;
  elementos.proximaPagina.disabled = paginaAtual === totalPaginas;
}

async function atualizarStatus(id, status) {
  try {
    await requisicao(`/atendimentos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await Promise.all([carregarAtendimentos(), carregarHorarios()]);
    mostrarMensagem(status === "Concluido" ? "Atendimento concluído com sucesso." : "Atendimento cancelado com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}
