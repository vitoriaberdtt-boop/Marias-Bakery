const express = require('express');
const app = express();
const port = 2000;
const Produtos = require("./models/Produtos");
const bodyParser = require('body-parser');

// Configurar Body Parser 
app.use(bodyParser.urlencoded({ extended: false })); //URL condificada 
app.use(bodyParser.json());

// Arquivos da pasta public 
app.use(express.static('public'));
app.use('/assets', express.static('public/assets')); // Rota para acessar imagens na pasta assets

// Rota inicial
app.get("/", function(req, res){
    res.send("Bem-vindo aos produtos Ímola! Vá para /produtos para ver a lista dos produtinhos");
});


//CRUD - Create, Read, Update, Delete

// Rota para cadastro de produtos (CREATE)
app.post("/cadastro", function(req, res){
    Produtos.create({
        Nome: req.body.Nome,
        Preço: req.body.Preço,
        Descricao: req.body.Descricao,
        Imagem: req.body.Imagem
    })
    //validação de sucesso 
    .then(function(){
        res.send("Produto cadastrado com sucesso!")
    })
    //validação de erro
    .catch(function(erro){
        res.send("Erro ao cadastrar produto: " + erro)
    });
});

// Rota para listar produtos (READ)
app.get("/produtos", function(req, res){
    Produtos.findAll().then(function(produtos){
        res.send({produtos: produtos});
    })
    //validação de erro
    .catch(function(erro){
        res.send("Erro ao buscar produtos: " + erro);
    });
});

// Rota para atualizar um produto (UPDATE)
app.put("/atualizar/:id", function(req, res){
    Produtos.update({
        Nome: req.body.Nome,
        Preço: req.body.Preço,
        Descricao: req.body.Descricao,
        Imagem: req.body.Imagem
}   , {
        where: {id: req.params.id}
    })
    //validação de sucesso 
    .then(function(){
        res.send("Produto atualizado com sucesso!")
    })
    //validação de erro
    .catch(function(erro){
        res.send("Erro ao atualizar produto: " + erro)
    });
});

// Rota para deletar um produto (DELETE)
app.delete("/deletar/:id", function(req, res){
    Produtos.destroy({
        where: {id: req.params.id}
    })
    //validação de sucesso 
    .then(function(){
        res.send("Produto deletado com sucesso!")
    })
    //validação de erro
    .catch(function(erro){
        res.send("Erro ao deletar produto: " + erro)
    });
});

const PORT = process.env.PORT || 2000;

// Ouvinte (aparece no terminal)
app.listen(PORT, "0.0.0.0", function(){
  console.log(`Server is running on port ${PORT}`);
  console.log('Hello, World!');
});