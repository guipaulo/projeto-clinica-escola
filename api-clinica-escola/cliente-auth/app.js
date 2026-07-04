const form = document.querySelector('#form-login');
const saida = document.querySelector('#saida');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dadosFormulario = new FormData(form);
  const payload = Object.fromEntries(dadosFormulario.entries());

  try {
    const response = await fetch('http://localhost:3000/autenticacao/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const corpo = await response.json();

    saida.textContent = JSON.stringify(
      {
        status: response.status,
        ok: response.ok,
        corpo,
      },
      null,
      2,
    );
  } catch (erro) {
    saida.textContent = JSON.stringify(
      {
        mensagem: 'Falha de rede ou CORS',
        detalhe: erro.message,
      },
      null,
      2,
    );
  }
});