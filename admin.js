
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function atualizarTabela() {
  const tbody = document.querySelector("#tabela-produtos tbody");
  tbody.innerHTML = "";
  produtos.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.nome}</td>
      <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
      <td>${p.categoria}</td>
      <td>
        <button onclick="editarProduto(${i})">✏️</button>
        <button onclick="excluirProduto(${i})">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editarProduto(i) {
  const p = produtos[i];
  document.getElementById("nome-produto").value = p.nome;
  document.getElementById("preco-produto").value = p.preco;
  document.getElementById("categoria-produto").value = p.categoria;
  document.getElementById("imagem-produto").value = p.imagem;
  produtos.splice(i, 1);
  salvarProdutos();
  atualizarTabela();
  atualizarProdutosSite();
}

function excluirProduto(i) {
  if (confirm("Deseja excluir este produto?")) {
    produtos.splice(i, 1);
    salvarProdutos();
    atualizarTabela();
    atualizarProdutosSite();
  }
}

document.getElementById("form-produto").onsubmit = function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome-produto").value;
  const preco = parseFloat(document.getElementById("preco-produto").value);
  const categoria = document.getElementById("categoria-produto").value;
  const imagem = document.getElementById("imagem-produto").value;
  produtos.push({ nome, preco, categoria, imagem });
  salvarProdutos();
  atualizarTabela();
  atualizarProdutosSite();
  this.reset();
};

document.addEventListener("DOMContentLoaded", () => {
  atualizarTabela();
  atualizarProdutosSite();
});

function atualizarProdutosSite() {
  const div = document.getElementById("lista-produtos");
  if (!div) return;
  div.innerHTML = "";
  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.categoria = p.categoria;
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" />
      <h3>${p.nome}</h3>
      <p>R$ ${parseFloat(p.preco).toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho('${p.nome}', ${p.preco})">Comprar</button>
    `;
    div.appendChild(card);
  });
}
