export function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export function verificarAcesso(perfilEsperado) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || usuario.perfil !== perfilEsperado) {
    alert('Acesso negado!');
    window.location.href = 'index.html';
  }

  return usuario;
}

export function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}