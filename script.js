function trocar(id,btn){
document.querySelectorAll('.pagina').forEach(p=>p.classList.remove('ativa'));
document.getElementById(id).classList.add('ativa');
document.querySelectorAll('.menu button').forEach(b=>b.classList.remove('ativo'));
btn.classList.add('ativo');
window.scrollTo(0,0);
}
