function renderizarProdutos(produtos) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';


    produtos.forEach(product => {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = product.Nome;
        fieldset.innerHTML = `
            <p><strong>Preço:</strong> R$ ${product.Preço}</p>
            <p><strong>Descrição:</strong> ${product.Descricao}</p>
            <div style="display: flex; justify-content: center;">
                <img src="/assets/${product.Imagem}" alt="${product.Nome}" width="250" height="auto"
                style="border-radius: 1rem; box-shadow: 4px 4px 10px rgba(0,0,0,0.3);">
            </div>
        `;
        fieldset.prepend(legend);
        productList.appendChild(fieldset);
        button = document.createElement('button');
        button.textContent = 'Adicionar ao carrinho';
        fieldset.appendChild(button);
        button.addEventListener('click', function() {
            adicionarAoCarrinho(product);
            alert(`Produto "${product.Nome}" adicionado ao carrinho!`);
        });
    });
}