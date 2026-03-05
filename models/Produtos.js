const database = require("./database");

//Define a tabela de produtos final
const Produtos = database.sequelize.define("produtos", {
    Nome: {
        type: database.Sequelize.STRING, //caracteres
        allowNull: false
    },
    Preço: {
        type: database.Sequelize.DOUBLE, //números decimais
        allowNull: false
    },
    Descricao: {
        type: database.Sequelize.STRING, //caracteres
        allowNull: false
    },
    Imagem: {
        type: database.Sequelize.STRING, //caracteres
        allowNull: true
    }
});

//Força a criação da tabela se ela não existir e impede que ela seja recriada se já existir (force: false)
Produtos.sync({force: false}).then(function(){
    console.log("Tabela de produtos criada com sucesso!")
}).catch(function(erro){
    console.log("Erro ao criar tabela de produtos: " + erro)
});

//exporta a tabela de produtos para ela ser utilizada em outros arquivos
module.exports = Produtos; 