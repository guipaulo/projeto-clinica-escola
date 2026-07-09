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

    // Remove classes anteriores
    saida.classList.remove('sucesso', 'erro');

    if (!response.ok) {
      saida.classList.add('erro');
      saida.textContent = corpo.message || 'Usuário ou senha inválidos.';
      return;
    }

    // Salva o token
    localStorage.setItem('token', corpo.access_token);

    // Salva os dados do usuário
    localStorage.setItem('usuario', JSON.stringify(corpo.usuario));

    saida.classList.add('sucesso');
    saida.textContent = 'Login realizado com sucesso!';

    // Redireciona conforme o perfil
    setTimeout(() => {
      switch (corpo.usuario.perfil) {
        case 'admin':
          window.location.href = 'homeadm.html';
          break;

        case 'profissional':
          window.location.href = 'homeprofissional.html';
          break;

        case 'aluno':
          window.location.href = 'homealuno.html';
          break;

        default:
          localStorage.clear();
          saida.classList.remove('sucesso');
          saida.classList.add('erro');
          saida.textContent = 'Perfil de usuário inválido.';
      }
    }, 1000);

  } catch (erro) {
    saida.classList.remove('sucesso');
    saida.classList.add('erro');
    saida.textContent = `Falha de rede: ${erro.message}`;
  }
});