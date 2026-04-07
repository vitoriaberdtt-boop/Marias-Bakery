function renderizarProdutos(produtos) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';


produtos.forEach(product => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');

    fieldset.style.cssText = `
        border: 1px solid #e0ddd9;
        border-radius: 16px;
        padding: 1.25rem;
        background: #fff;
        box-shadow: 0 4px 16px rgba(35, 34, 33, 0.08);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    `;

    legend.style.cssText = `
        font-size: 1.2rem;
        font-weight: 600;
        color: #251509;
        background: #ef9ac9;
        padding: 8px 12px;
        border-radius: 0.8rem;
    `;

    legend.textContent = product.Nome;

    fieldset.addEventListener('mouseover', () => {
        fieldset.style.transform = 'translateY(-4px)';
        fieldset.style.boxShadow = '0 8px 24px rgba(35, 34, 33, 0.15)';
    });

    fieldset.addEventListener('mouseout', () => {
        fieldset.style.transform = 'translateY(0)';
        fieldset.style.boxShadow = '0 4px 16px rgba(35, 34, 33, 0.08)';
    });

    fieldset.innerHTML = `
        <p style="font-size: 14px; color: #221408; margin: 0 0 3px;"><strong>Preço:</strong> R$ ${product.Preço}</p>
        <p style="font-size: 14px; color: #221408; margin: 0 0 1rem; line-height: 2;"><strong>Descrição:</strong> ${product.Descricao}</p>
        <div style="display: flex; justify-content: center; margin-top: 0.5rem;">
            <img src="/assets/${product.Imagem}" alt="${product.Nome}" width="240" height="auto"
            style="border-radius: 1rem; box-shadow: 0 8px 24px rgba(35, 34, 33, 0.4); transition: transform 0.3s ease;"
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'">
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