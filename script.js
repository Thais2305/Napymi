let produtoAtual = null;
let precoAtual = 0;
let freteValor = 0;

function mostrarAba(id) {
  document.querySelectorAll('.conteudo').forEach(el => el.classList.remove('ativo'));
  document.getElementById(id).classList.add('ativo');
  window.scrollTo(0,0);
}

function comprar(nome, preco) {
  produtoAtual = nome;
  precoAtual = preco;
  document.getElementById('produto-escolhido').innerHTML = `<b>${nome}</b>`;
  document.getElementById('total').innerHTML = `Subtotal: R$ ${preco.toFixed(2).replace('.',',')}`;
  mostrarAba('loja');
  document.getElementById('checkout').scrollIntoView({behavior:'smooth'});
}

async function calcularFrete() {
  const cep = document.getElementById('cep').value.replace(/\D/g,'');
  if(cep.length !== 8){ alert('Digite um CEP válido com 8 números'); return; }
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resp.json();
    if(dados.erro){ document.getElementById('endereco').innerText = 'CEP não encontrado'; return; }
    document.getElementById('endereco').innerText = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
    freteValor = 19.90;
    document.getElementById('frete').innerText = `Frete: R$ ${freteValor.toFixed(2).replace('.',',')}`;
    if(precoAtual>0){
      const total = precoAtual + freteValor;
      document.getElementById('total').innerHTML = `<b>Total: R$ ${total.toFixed(2).replace('.',',')}</b>`;
    }
  } catch(e){
    document.getElementById('endereco').innerText = 'Erro ao buscar CEP';
  }
}

function finalizarCompra() {
  const nome = document.getElementById('nome').value;
  if(!produtoAtual){ alert('Selecione um produto na loja!'); return; }
  if(!nome){ alert('Digite seu nome!'); return; }
  if(freteValor===0){ alert('Calcule o frete primeiro!'); return; }
  const total = precoAtual + freteValor;
  const endereco = document.getElementById('endereco').innerText;
  const msg = `Olá NAPYMI! Quero comprar:\n${produtoAtual}\nNome: ${nome}\nEndereço: ${endereco}\nTotal com frete: R$ ${total.toFixed(2)}`;
  window.open(`https://wa.me/5521999999999?text=${encodeURIComponent(msg)}`, '_blank');
}
