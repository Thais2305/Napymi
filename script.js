let carrinho = []; let freteValor = 0;
function mostrarAba(id) {
  document.querySelectorAll('.conteudo').forEach(el => el.classList.remove('ativo'));
  document.getElementById(id).classList.add('ativo');
  window.scrollTo(0,0);
}
function comprar(nome, preco) {
  carrinho.push({nome, preco});
  atualizarCarrinho();
  mostrarAba('loja');
  document.getElementById('checkout').scrollIntoView({behavior:'smooth'});
}
function atualizarCarrinho() {
  if(carrinho.length === 0) {
    document.getElementById('produto-escolhido').innerText = 'Carrinho vazio - adicione produtos acima';
    document.getElementById('total').innerText = ''; return;
  }
  let lista = carrinho.map((item, index) => `${index+1}. ${item.nome}`).join('\n');
  let subtotal = carrinho.reduce((soma, item) => soma + item.preco, 0);
  document.getElementById('produto-escolhido').innerText = lista + `\n\nSubtotal: R$ ${subtotal.toFixed(2).replace('.',',')}`;
  if(freteValor > 0) {
    document.getElementById('total').innerHTML = `Total com frete: R$ ${(subtotal+freteValor).toFixed(2).replace('.',',')}`;
  } else {
    document.getElementById('total').innerHTML = `Subtotal: R$ ${subtotal.toFixed(2).replace('.',',')} + frete`;
  }
}
async function calcularFrete() {
  const cep = document.getElementById('cep').value.replace(/\D/g,'');
  if(cep.length !== 8) { alert('Digite um CEP válido'); return; }
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resp.json();
    if(dados.erro) { document.getElementById('endereco').innerText = 'CEP não encontrado'; return; }
    document.getElementById('endereco').innerText = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
    freteValor = 19.90;
    document.getElementById('frete').innerText = `Frete: R$ ${freteValor.toFixed(2).replace('.',',')}`;
    atualizarCarrinho();
  } catch(e) { document.getElementById('endereco').innerText = 'Erro ao buscar CEP'; }
}
function finalizarCompra() {
  const nome = document.getElementById('nome').value;
  if(carrinho.length === 0) { alert('Adicione pelo menos 1 produto!'); return; }
  if(!nome) { alert('Digite seu nome!'); return; }
  if(freteValor === 0) { alert('Calcule o frete!'); return; }
  let subtotal = carrinho.reduce((s,n) => s+n.preco,0);
  let total = subtotal + freteValor;
  let listaProdutos = carrinho.map(p => `- ${p.nome}`).join('\n');
  let endereco = document.getElementById('endereco').innerText;
  const msg = `Olá NAPYMI!! Quero comprar:\n${listaProdutos}\n\nNome: ${nome}\nEndereço: ${endereco}\nTotal com frete: R$ ${total.toFixed(2)}`;
  window.open(`https://wa.me/5521999999999?text=${encodeURIComponent(msg)}`, '_blank');
}
