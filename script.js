function mostrarAba(id){
  document.querySelectorAll('.conteudo').forEach(sec => sec.classList.remove('ativo'));
  document.getElementById(id).classList.add('ativo');
}

let valorProduto = 15.90;
let valorFrete = 0;
let produtoSelecionado = "";

function comprar(produto){
  produtoSelecionado = produto;
  document.getElementById('produto-escolhido').innerText = "Selecionado: " + produto;
  document.getElementById('checkout').scrollIntoView({behavior:'smooth'});
}

async function calcularFrete(){
  const cep = document.getElementById('cep').value.replace(/\D/g,'');
  if(cep.length !== 8){ alert("Digite um CEP válido"); return; }

  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await res.json();
  if(dados.erro){ alert("CEP não encontrado"); return; }

  document.getElementById('endereco').innerText = `${dados.logradouro} - ${dados.bairro} - ${dados.localidade}/${dados.uf}`;

  if(dados.uf === "RJ") valorFrete = 10.00;
  else if(dados.uf === "SP" || dados.uf === "MG" || dados.uf === "ES") valorFrete = 15.00;
  else valorFrete = 25.00;

  document.getElementById('frete').innerText = `Frete: R$ ${valorFrete.toFixed(2)}`;
  document.getElementById('total').innerText = `Total: R$ ${(valorProduto + valorFrete).toFixed(2)}`;
}

function finalizarCompra(){
  const nome = document.getElementById('nome').value;
  const cep = document.getElementById('cep').value;
  if(!nome || !cep || !produtoSelecionado){ alert("Escolha um produto e preencha nome e CEP"); return; }
  const numero = "5521999999999"; // TROCA AQUI PELO SEU WHATS
  const msg = `Olá NAPYMI! Sou ${nome}. Quero: ${produtoSelecionado}. CEP: ${cep}. ${document.getElementById('endereco').innerText} - ${document.getElementById('frete').innerText} - ${document.getElementById('total').innerText}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank');
}

// inicia na aba conceito
mostrarAba('conceito');
