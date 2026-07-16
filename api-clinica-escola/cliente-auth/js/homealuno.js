const API_ALUNOS = "http://localhost:3000/alunos";

// ============================
// TOKEN
// ============================

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}

// ============================
// PROTEÇÃO DE ROTA
// ============================

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario || !getToken()) {
    window.location.href = "../login.html";
}

// 🔥 bloqueia se não for aluno
if (usuario.perfil !== "aluno") {
    alert("Acesso permitido apenas para alunos");
    window.location.href = "../login.html";
}

// ============================
// LOGOUT
// ============================

document.getElementById("logout").onclick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "../login.html";
};

// ============================
// MOSTRAR USUÁRIO
// ============================

document.getElementById("usuario-logado").innerText =
    `${usuario.nome} (Aluno)`;

// ============================
// BUSCAR MEUS DADOS
// ============================

let alunoId = null;

async function carregarDados() {
    try {
        const res = await fetch(API_ALUNOS, {
            headers: getHeaders()
        });

        const lista = await res.json();

        // 🔥 encontra o aluno pelo email
        const aluno = lista.find(a => a.email === usuario.email);

        if (!aluno) {
            document.getElementById("dadosAluno").innerText =
                "Aluno não encontrado";
            return;
        }

        alunoId = aluno.id;

        document.getElementById("dadosAluno").innerHTML = `
            <p><b>ID:</b> ${aluno.id}</p>
            <p><b>Nome:</b> ${aluno.nome}</p>
            <p><b>Telefone:</b> ${aluno.telefone || "-"}</p>
            <p><b>Email:</b> ${aluno.email || "-"}</p>
            <p><b>Status:</b> ${aluno.ativo ? "Ativo" : "Inativo"}</p>
        `;

        // preenche formulário
        const form = document.getElementById("formAluno");
        form.nome.value = aluno.nome;
        form.telefone.value = aluno.telefone || "";
        form.email.value = aluno.email || "";

    } catch {
        document.getElementById("msg").innerText =
            "Erro ao carregar dados";
    }
}

// ============================
// ATUALIZAR DADOS
// ============================

document.getElementById("formAluno").onsubmit = async (e) => {
    e.preventDefault();

    if (!alunoId) return;

    const form = new FormData(e.target);

    const dados = {
        nome: form.get("nome"),
        telefone: form.get("telefone"),
        email: form.get("email")
    };

    try {
        const res = await fetch(`${API_ALUNOS}/${alunoId}`, {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify(dados)
        });

        if (!res.ok) throw new Error();

        document.getElementById("msg").innerText =
            "Atualizado com sucesso";

        carregarDados();

    } catch {
        document.getElementById("msg").innerText =
            "Erro ao atualizar";
    }
};

// ============================
// INIT
// ============================

carregarDados();