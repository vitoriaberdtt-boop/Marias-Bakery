async function carregarProdutos() {
    const response = await fetch('/produtos');
    const data = await response.json();
    todosProdutos = data.produtos;
    renderizarProdutos(todosProdutos);
}