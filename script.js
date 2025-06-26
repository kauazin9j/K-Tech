
let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  exibirCarrinho();
}

function exibirCarrinho() {
  const div = document.getElementById("itens-carrinho");
  div.innerHTML = "";
  let total = 0;
  carrinho.forEach(item => {
    div.innerHTML += `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`;
    total += item.preco;
  });
  if (carrinho.length > 0) div.innerHTML += `<hr><strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

function alternarModo() {
  document.body.classList.toggle('dark');
  localStorage.setItem('modo', document.body.classList.contains('dark') ? 'dark' : '');
}

if (localStorage.getItem('modo') === 'dark') document.body.classList.add('dark');

function enviarMensagem(e) {
  e.preventDefault();
  alert("Mensagem enviada com sucesso! (simulado)");
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mensagem").value = "";
}

function filtrarProdutos() {
  const filtro = document.getElementById("filtro").value;
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = filtro === 'todos' || card.dataset.categoria === filtro ? 'block' : 'none';
  });
}

let index = 0;
setInterval(() => {
  const slides = document.querySelectorAll('.carrossel img');
  slides.forEach((s, i) => s.classList.toggle('ativo', i === index));
  index = (index + 1) % slides.length;
}, 4000);

function aceitarCookies() {
  document.getElementById('cookies').style.display = 'none';
  localStorage.setItem('cookies', 'aceito');
}

if (!localStorage.getItem('cookies')) {
  document.getElementById('cookies').style.display = 'block';
}

function mostrarLogin() {
  document.getElementById("login-container").style.display = 'flex';
}

document.getElementById("login-form").onsubmit = function(e) {
  e.preventDefault();
  const usuario = document.getElementById("login-usuario").value;
  const senha = document.getElementById("login-senha").value;
  if (usuario === "admin" && senha === "1234") {
    document.getElementById("login-container").style.display = 'none';
    document.getElementById("site-content").style.display = 'none';
    document.getElementById("admin-panel").classList.remove("hidden");
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function logout() {
  document.getElementById("admin-panel").classList.add("hidden");
  document.getElementById("site-content").style.display = 'block';
}
