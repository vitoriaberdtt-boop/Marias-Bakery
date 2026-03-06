let todosProdutos = [];
let carrinho = [];

// Adiciona produto ao carrinho (agrupa duplicatas)
function adicionarAoCarrinho(product) {
    const itemExistente = carrinho.find(item => item.id === product.id);


    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: product.id,
            nome: product.Nome,
            preco: parseFloat(product.Preço),
            descricao: product.Descricao,
            imagem: product.Imagem,
            quantidade: 1
        });
    }
    atualizarCarrinho();
}


// Atualiza a exibição do carrinho
function atualizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    const totalEl = document.getElementById('carrinho-total');
    const contador = document.getElementById('carrinho-contador');
    const carrito = document.getElementById('carrito');
    const carrinhomsg = document.getElementById('carrinho-msg');


    if (!lista) return; // Sai se o HTML do carrinho não existir ainda


    lista.innerHTML = '';


    if (carrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#888;">Carrinho vazio.</p>';
        totalEl.textContent = 'Total: R$ 0,00';
        contador.style.display = 'none';
        carrito.style.display = 'none';
        carrinhomsg.style.display = 'block';
        return;
    }


    carrito.style.display = 'block';
    carrinhomsg.style.display = 'none';


    let total = 0;


    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;


        const div = document.createElement('div');
        div.style.cssText = 'display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:3px solid #d7a231;';
        div.innerHTML = `
            <img src="/assets/${item.imagem}" width="80" height="auto"
                 style="border-radius:8px; object-fit:cover;">


            <div style="flex:1;">
                <strong>${item.nome}</strong><br>
                <span>R$ ${item.preco.toFixed(2)} × ${item.quantidade}</span>
            </div>


            <div style="display:flex; align-items:center; gap:6px;">


                <button onclick="alterarQuantidade(${index}, -1)"
                    style="width:26px;height:26px;border-radius:20%;border:1px solid #ccc;cursor:pointer;font-size:20px;">−
                </button>
                <span>${item.quantidade}</span>


                <button onclick="alterarQuantidade(${index}, 1)"  
                    style="width:26px;height:26px;border-radius:20%;border:1px solid #ccc;cursor:pointer;font-size:20px;">+
                </button>


                <button onclick="removerDoCarrinho(${index})"
                    style="background:none;border:none;cursor:pointer;color:red;font-size:30px;">🗑
                </button>
            </div>
        `;
        lista.appendChild(div);
    });


    totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;


    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contador.textContent = totalItens;
    contador.style.display = totalItens > 0 ? 'flex' : 'none';
}


function alterarQuantidade(index, delta) {
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}


function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}


document.getElementById('search').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    const filtrados = todosProdutos.filter(p =>
        p.Nome.toLowerCase().includes(termo)
    );
    renderizarProdutos(filtrados);
});


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
