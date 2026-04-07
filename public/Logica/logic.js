let todosProdutos = [];

// Adiciona produto ao carrinho via backend
async function adicionarAoCarrinho(product) {
    const resposta = await fetch('/carrinho/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: product.id,
            nome: product.Nome,
            preco: parseFloat(product.Preço),
            descricao: product.Descricao,
            imagem: product.Imagem
        })
    });

    const dados = await resposta.json();
    atualizarContador(dados.carrinho);
}

// Atualiza só o contador do ícone de carrinho
async function atualizarContador(carrinhoAtual) {
    // Se não recebeu o carrinho como parâmetro, busca do backend
    if (!carrinhoAtual) {
        const resposta = await fetch('/carrinho');
        const dados = await resposta.json();
        carrinhoAtual = dados.carrinho;
    }

    const contador = document.getElementById('carrinho-contador');
    if (!contador) return;

    const total = carrinhoAtual.reduce((acc, item) => acc + item.quantidade, 0);
    contador.textContent = total;
    contador.style.display = total > 0 ? 'flex' : 'none';
}

// Busca de produtos
document.getElementById('search').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    const filtrados = todosProdutos.filter(p =>
        p.Nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(filtrados);
});

// Ao carregar a página, atualiza o contador com o que já está na sessão
atualizarContador();
carregarProdutos();

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            hamburger.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });

    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
});