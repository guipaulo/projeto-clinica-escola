const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario'));

const perfilEsperado = document.body.dataset.perfil;

if (!token || !usuario || usuario.perfil !== perfilEsperado) {
  window.location.href = 'index.html';
}