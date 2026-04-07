let carrinho = [];

// Busca o carrinho do backend e renderiza
async function carregarCarrinho() {
    const resposta = await fetch('/carrinho', {
        credentials: 'include'
    });
    const dados = await resposta.json();
    carrinho = dados.carrinho;
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    const totalEl = document.getElementById('carrinho-total');
    const carrito = document.getElementById('carrito');
    const carrinhomsg = document.getElementById('carrinho-msg');
    const compra = document.getElementById('compra');

    lista.innerHTML = '';

    if (carrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#888;">Carrinho vazio.</p>';
        totalEl.textContent = 'Total: R$ 0,00';
        carrito.style.display = 'none';
        carrinhomsg.style.display = 'block';
        compra.style.display = 'none';
        return;
    }

    carrito.style.display = 'block';
    compra.style.display = 'block';
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
                <button onclick="alterarQuantidade(${item.id}, -1)"
                    style="width:26px;height:26px;border-radius:20%;border:1px solid #ccc;cursor:pointer;font-size:20px;">−
                </button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQuantidade(${item.id}, 1)"
                    style="width:26px;height:26px;border-radius:20%;border:1px solid #ccc;cursor:pointer;font-size:20px;">+
                </button>
                <button onclick="removerDoCarrinho(${item.id})"
                    style="background:none;border:none;cursor:pointer;color:red;font-size:30px;">🗑
                </button>
            </div>
        `;
        lista.appendChild(div);
    });

    totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

document.getElementById('compra-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário
    
    const nome = document.getElementById('nome').value;
    alert(`Você não pode confirmar a compra, ${nome}! A Maria não existe, e essa confeitaria não é real. Mas obrigada por visitar o site :)`);
    
    // Limpar formulário
    this.reset();
});

async function alterarQuantidade(id, delta) {
    const item = carrinho.find(i => i.id == id);

    const novaQuantidade = item.quantidade + delta;

    if (novaQuantidade <= 0) {
        await removerDoCarrinho(id);
        return;
    }

    const resposta = await fetch('/carrinho/atualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, quantidade: novaQuantidade }),
        credentials: 'include',
    });

    const dados = await resposta.json();
    carrinho = dados.carrinho;
    renderizarCarrinho();
}

async function removerDoCarrinho(id) {
    const resposta = await fetch(`/carrinho/remover/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const dados = await resposta.json();
    carrinho = dados.carrinho;
    renderizarCarrinho();
}

carregarCarrinho();