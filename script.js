function trocar(id, botao){
  // Esconde todas as paginas
  document.querySelectorAll('.pagina').forEach(p => {
    p.classList.remove('ativa');
  });
  
  // Mostra a pagina clicada
  document.getElementById(id).classList.add('ativa');
  
  // Atualiza o botao ativo
  document.querySelectorAll('.menu button').forEach(b => {
    b.classList.remove('ativo');
  });
  botao.classList.add('ativo');
  
  // Sobe pro topo
  window.scrollTo(0,0);
}
