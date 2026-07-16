const API = 'http://localhost:3000';

// 🔑 pega token do login
function getToken() {
  return localStorage.getItem('token');
}

// 🧠 decodifica token
function getPayload() {
  const token = getToken();
  if (!token) return null;

  const payloadBase64 = token.split('.')[1];
  return JSON.parse(atob(payloadBase64));
}

// 🧑‍⚕️ pega id do profissional logado
function getProfissionalId() {
  const payload = getPayload();
  return payload?.sub; // ou payload.id (depende do seu JWT)
}

// 📌 carregar atendimentos do profissional
async function carregarAtendimentos() {
  const profissionalId = getProfissionalId();

  const res = await fetch(`${API}/atendimentos?profissionalId=${profissionalId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const dados = await res.json();

  const lista = document.getElementById('listaAtendimentos');
  lista.innerHTML = '';

  dados.forEach(at => {
    const li = document.createElement('li');

    li.innerHTML = `
      ID: ${at.id} |
      Aluno: ${at.alunoId} |
      Serviço: ${at.servicoId} |
      Horário: ${at.horarioId} |
      Status: ${at.status}

      <button onclick="concluir(${at.id})">Concluir</button>
      <button onclick="cancelar(${at.id})">Cancelar</button>
    `;

    lista.appendChild(li);
  });
}

// ✅ concluir atendimento
async function concluir(id) {
  await fetch(`${API}/atendimentos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ status: 'Concluido' })
  });

  carregarAtendimentos();
}

// ❌ cancelar atendimento
async function cancelar(id) {
  await fetch(`${API}/atendimentos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ status: 'Cancelado' })
  });

  carregarAtendimentos();
}

// 🕒 carregar horários disponíveis
async function carregarHorarios() {
  const res = await fetch(`${API}/horarios`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const dados = await res.json();

  const lista = document.getElementById('listaHorarios');
  lista.innerHTML = '';

  dados
    .filter(h => h.status === 'disponivel')
    .forEach(h => {
      const li = document.createElement('li');

      li.innerHTML = `
        ID: ${h.id} |
        Data: ${h.data} |
        ${h.horaInicio} - ${h.horaFim}
      `;

      lista.appendChild(li);
    });
}