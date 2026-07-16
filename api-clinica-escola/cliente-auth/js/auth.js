(function protegerPagina() {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const perfilEsperado = document.body.dataset.perfil;

  if (!token || !usuario || (perfilEsperado && usuario.perfil !== perfilEsperado)) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.replace("index.html");
    return;
  }

  window.auth = {
    token,
    usuario,
    headers() {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "index.html";
    },
  };
})();
