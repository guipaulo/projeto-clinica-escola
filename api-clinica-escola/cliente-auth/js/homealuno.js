const API = "";

const elementos = {
  usuarioLogado: document.getElementById("usuario-logado"),
  logout: document.getElementById("logout"),
  dadosAluno: document.getElementById("dadosAluno"),
  formAluno: document.getElementById("formAluno"),
  formAgendamento: document.getElementById("formAgendamento"),
  servico: document.getElementById("servico"),
  profissional: document.getElementById("profissional"),
  horario: document.getElementById("horario"),
  listaAtendimentos: document.getElementById("listaAtendimentos"),
  msg: document.getElementById("msg"),
};

const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

let alunoAtual = null;
let servicos = [];
let profissionais = [];
let horarios = [];

if (!usuario || !token || usuario.perfil !== "aluno") {
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

function mostrarMensagem(texto, tipo = "sucesso") {
  elementos.msg.textContent = texto;
  elementos.msg.className = `mensagem ${tipo}`;
}

function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function iniciar() {
  elementos.usuarioLogado.textContent = `${usuario.nome} (Aluno)`;
  registrarEventos();

  try {
    await carregarAluno();
    await Promise.all([carregarServicos(), carregarProfissionais(), carregarHorarios()]);
    await carregarAtendimentos();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

function registrarEventos() {
  elementos.logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
  });

  elementos.formAluno.addEventListener("submit", atualizarDados);
  elementos.formAgendamento.addEventListener("submit", agendarAtendimento);
  elementos.servico.addEventListener("change", preencherProfissionais);
  elementos.profissional.addEventListener("change", preencherHorarios);
  elementos.listaAtendimentos.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-cancelar]");
    if (botao) cancelarAtendimento(Number(botao.dataset.cancelar));
  });
}

async function carregarAluno() {
  const alunos = await requisicao("/alunos");
  alunoAtual = alunos.find((aluno) => aluno.email === usuario.email);

  if (!alunoAtual) {
    throw new Error("Não foi encontrado um cadastro de aluno para este usuário.");
  }

  renderizarDadosAluno();
  elementos.formAluno.elements.nome.value = alunoAtual.nome;
  elementos.formAluno.elements.telefone.value = alunoAtual.telefone || "";
  elementos.formAluno.elements.email.value = alunoAtual.email || "";
}

function renderizarDadosAluno() {
  elementos.dadosAluno.innerHTML = `
    <div><span>ID</span><strong>${alunoAtual.id}</strong></div>
    <div><span>Nome</span><strong>${escaparHtml(alunoAtual.nome)}</strong></div>
    <div><span>Telefone</span><strong>${escaparHtml(alunoAtual.telefone || "Não informado")}</strong></div>
    <div><span>E-mail</span><strong>${escaparHtml(alunoAtual.email || "Não informado")}</strong></div>
    <div><span>Status</span><strong class="status ${alunoAtual.ativo ? "ativo" : "cancelado"}">${alunoAtual.ativo ? "Ativo" : "Inativo"}</strong></div>
  `;
}

async function atualizarDados(evento) {
  evento.preventDefault();
  if (!alunoAtual) return;

  const form = evento.currentTarget.elements;
  const dados = {
    nome: form.nome.value.trim(),
    telefone: form.telefone.value.trim(),
  };

  try {
    alunoAtual = await requisicao(`/alunos/${alunoAtual.id}`, {
      method: "PATCH",
      body: JSON.stringify(dados),
    });
    renderizarDadosAluno();
    mostrarMensagem("Dados atualizados com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

async function carregarServicos() {
  servicos = await requisicao("/servicos");
  elementos.servico.innerHTML = '<option value="">Selecione o serviço</option>' +
    servicos.map((servico) => `<option value="${servico.id}">${escaparHtml(servico.nome)} (${servico.duracao} min)</option>`).join("");
}

async function carregarProfissionais() {
  profissionais = await requisicao("/profissionais");
  preencherProfissionais();
}

function preencherProfissionais() {
  const servicoId = Number(elementos.servico.value);
  const filtrados = profissionais.filter((profissional) =>
    profissional.ativo && profissional.servicesIds.includes(servicoId)
  );

  elementos.profissional.disabled = !servicoId;
  elementos.profissional.innerHTML = !servicoId
    ? '<option value="">Selecione primeiro o serviço</option>'
    : '<option value="">Selecione o profissional</option>' +
      filtrados.map((profissional) => `<option value="${profissional.id}">${escaparHtml(profissional.name)} — ${escaparHtml(profissional.specialty)}</option>`).join("");

  preencherHorarios();
}

async function carregarHorarios() {
  horarios = await requisicao("/horarios");
  preencherHorarios();
}

function preencherHorarios() {
  const profissionalId = Number(elementos.profissional.value);
  const disponiveis = horarios.filter(
    (horario) =>
      horario.status === "disponivel" &&
      horario.profissionalId === profissionalId
  );

  elementos.horario.disabled = !profissionalId;
  elementos.horario.innerHTML = !profissionalId
    ? '<option value="">Selecione primeiro o profissional</option>'
    : '<option value="">Selecione o horário</option>' +
      disponiveis.map((horario) => `<option value="${horario.id}">${escaparHtml(horario.data)} — ${escaparHtml(horario.horaInicio)} às ${escaparHtml(horario.horaFim)}</option>`).join("");
}

async function agendarAtendimento(evento) {
  evento.preventDefault();
  if (!alunoAtual) return;

  const dados = {
    alunoId: alunoAtual.id,
    profissionalId: Number(elementos.profissional.value),
    servicoId: Number(elementos.servico.value),
    horarioId: Number(elementos.horario.value),
  };

  try {
    await requisicao("/atendimentos", {
      method: "POST",
      body: JSON.stringify(dados),
    });
    elementos.formAgendamento.reset();
    preencherProfissionais();
    await Promise.all([carregarHorarios(), carregarAtendimentos()]);
    mostrarMensagem("Atendimento agendado com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

async function carregarAtendimentos() {
  if (!alunoAtual) return;
  const atendimentos = await requisicao(`/atendimentos?alunoId=${alunoAtual.id}`);

  if (atendimentos.length === 0) {
    elementos.listaAtendimentos.innerHTML = '<p class="estado-vazio">Você ainda não possui atendimentos.</p>';
    return;
  }

  elementos.listaAtendimentos.innerHTML = atendimentos.map((atendimento) => {
    const servico = servicos.find((item) => item.id === atendimento.servicoId);
    const profissional = profissionais.find((item) => item.id === atendimento.profissionalId);
    const horario = horarios.find((item) => item.id === atendimento.horarioId);
    const classeStatus = atendimento.status.toLowerCase();
    const podeCancelar = atendimento.status === "Agendado";

    return `
      <article class="atendimento-item">
        <div class="atendimento-info">
          <h3>${escaparHtml(servico?.nome || `Serviço ${atendimento.servicoId}`)}</h3>
          <p><strong>Profissional:</strong> ${escaparHtml(profissional?.name || `ID ${atendimento.profissionalId}`)}</p>
          <p><strong>Horário:</strong> ${horario ? `${escaparHtml(horario.data)} — ${escaparHtml(horario.horaInicio)} às ${escaparHtml(horario.horaFim)}` : `ID ${atendimento.horarioId}`}</p>
        </div>
        <div class="acoes">
          <span class="status ${classeStatus}">${escaparHtml(atendimento.status)}</span>
          ${podeCancelar ? `<button type="button" class="btn btn-sm btn-cancelar" data-cancelar="${atendimento.id}">Cancelar</button>` : ""}
        </div>
      </article>
    `;
  }).join("");
}

async function cancelarAtendimento(id) {
  try {
    await requisicao(`/atendimentos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "Cancelado" }),
    });
    await carregarAtendimentos();
    mostrarMensagem("Atendimento cancelado com sucesso.");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}
