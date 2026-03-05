require("dotenv").config(); //carrega as variáveis de ambiente do arquivo .env
const Sequelize = require("sequelize");
const mysql2 = require("mysql2"); //importa o módulo mysql2 para ser utilizado pelo Sequelize 

const sequelize = new Sequelize (
    process.env.MYSQLDATABASE, //nome do banco de dados
    process.env.MYSQLUSER, //usuário do banco de dados
    process.env.MYSQLPASSWORD, //senha do banco de dados
    {
        host: process.env.MYSQLHOST, //host do banco de dados
        port: process.env.MYSQLPORT, //porta do banco de dados
        dialect: "mysql", //tipo do banco de dados
        dialectModule: mysql2, //módulo do MySQL para o Sequelize
        logging: false, //desativa os logs de SQL no console
        pool: {max : 5, min: 0, acquire: 30000, idle: 10000} //configurações simultâneas de conexão
    }
);

(async () => {
    try {
        await sequelize.authenticate(); //tenta autenticar a conexão com o banco de dados
        console.log("Banco de dados conectado com sucesso!");
    } catch (erro) {
        console.error("Erro ao conectar com o banco de dados:", erro);
    }
})();


//exporta o banco de dados para ser utilizado em outros arquivos
module.exports = {Sequelize, sequelize};
