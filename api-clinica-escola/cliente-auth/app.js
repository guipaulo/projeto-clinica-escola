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

    // Remove classes antigas
    saida.classList.remove('sucesso', 'erro');

    if (response.ok) {
    localStorage.setItem("token", corpo.access_token);

    saida.classList.remove("erro");
    saida.classList.add("sucesso");
    saida.textContent = "Login realizado com sucesso!";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
    }

  } catch (erro) {
    saida.classList.remove('sucesso');
    saida.classList.add('erro');
    saida.textContent = `Falha de rede: ${erro.message}`;
  }
});