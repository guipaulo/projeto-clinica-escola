const API = "http://localhost:3000";

const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = localStorage.getItem("token");

function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

// ============================
// PROTEÇÃO
// ============================

if (!usuario || usuario.perfil !== "aluno") {
    window.location.href = "../login.html";
}

// ============================
// LOGOUT
// ============================

document.getElementById("logout").onclick = () => {
    localStorage.clear();
    window.location.href = "../login.html";
};

document.getElementById("usuario-logado").innerText =
    `${usuario.nome} (Aluno)`;

// ============================
// PEGAR ID DO ALUNO
// ============================

let alunoId = null;

async function pegarAluno() {
    const res = await fetch(`${API}/alunos`, { headers: headers() });
    const alunos = await res.json();

    const aluno = alunos.find(a => a.email === usuario.email);

    if (!aluno) {
        document.getElementById("msg").innerText = "Aluno não encontrado";
        return;
    }

    alunoId = aluno.id;

    document.getElementById("dadosAluno").innerHTML = `
        Nome: ${aluno.nome}<br>
        Email: ${aluno.email || "-"}<br>
        Telefone: ${aluno.telefone || "-"}
    `;
}

// ============================
// CARREGAR SERVIÇOS
// ============================

async function carregarServicos() {
    const res = await fetch(`${API}/servicos`, { headers: headers() });
    const servicos = await res.json();

    const select = document.getElementById("servico");

    servicos.forEach(s => {
        select.innerHTML += `
            <option value="${s.id}">
                ${s.nome} (${s.duracao}min)
            </option>
        `;
    });
}

// ============================
// CARREGAR HORÁRIOS
// ============================

async function carregarHorarios() {
    const res = await fetch(`${API}/horarios`, { headers: headers() });
    const horarios = await res.json();

    const select = document.getElementById("horario");

    select.innerHTML = "";

    horarios
        .filter(h => h.status === "disponivel")
        .forEach(h => {
            select.innerHTML += `
                <option value="${h.id}">
                    ${h.data} ${h.horaInicio}-${h.horaFim}
                </option>
            `;
        });
}

// ============================
// AGENDAR
// ============================

async function agendar() {
    const dados = {
        alunoId,
        profissionalId: Number(document.getElementById("profissionalId").value),
        servicoId: Number(document.getElementById("servico").value),
        horarioId: Number(document.getElementById("horario").value)
    };

    try {
        const res = await fetch(`${API}/atendimentos`, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify(dados)
        });

        const resposta = await res.json();

        if (!res.ok) throw new Error(resposta.message);

        document.getElementById("msg").innerText =
            "Agendado com sucesso!";

        carregarAtendimentos();
        carregarHorarios();

    } catch (err) {
        document.getElementById("msg").innerText =
            err.message || "Erro ao agendar";
    }
}

// ============================
// LISTAR MEUS ATENDIMENTOS
// ============================

async function carregarAtendimentos() {
    if (!alunoId) return;

    const res = await fetch(
        `${API}/atendimentos?alunoId=${alunoId}`,
        { headers: headers() }
    );

    const lista = await res.json();

    const ul = document.getElementById("listaAtendimentos");
    ul.innerHTML = "";

    lista.forEach(a => {
        ul.innerHTML += `
            <li>
                Atendimento #${a.id} - ${a.status}
            </li>
        `;
    });
}

// ============================
// INIT
// ============================

async function init() {
    await pegarAluno();
    await carregarServicos();
    await carregarHorarios();
    await carregarAtendimentos();
}

init();