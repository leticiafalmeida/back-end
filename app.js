const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
require("./config/connection"); //banco de dados

class App {
  constructor() {
    this.app = express(); //com a variavel chamando o express lá em cima, agora a variável app tem todos os poderes do express.
    this.middlewares();
    this.routes(); //são as rotas da aplicação que a gente vai ter.
  } //com esse método (constructor) esse arquivo é instaciado em qualquer outra aplicação

  middlewares() {
    this.app.use(express.json()); // isso faz com que nossa aplicação comece a entender dados no formato json. (olhe o significado de middleware ao fim).
    this.app.use(morgan("dev")); //add (no consoole) o morgan (você importa ele lá em cima) para gerenciar as requisições da nossa API, o parâmetro dev vai trazer algumas informações sobre a requisição que estão fazendo para a minha aplicação.
    this.app.use((req, res, next) => {
      res.header("Acess-Controll-Allow-Origin", "*"); //quais origens eu vou aceitar na requisição, nesse caso estou dizendo que aceito qualquer origem.
      res.header("Acess-Controll-Allow-Methods", "GET, POST, PUT, DELETE"); //quais metodos eu vou aceitar na requisição, nesse caso estou dizendo que aceito o get, POST, PUT, DELETE.
      res.header(
        "Acess-Controll-Allow-Headers",
        "Acess, Content-type, Authorization, Acept, Origin, X-Requested-With"
      ); //quais cabeçalhos eu vou aceitar na requisição, nesse caso estou dizendo que aceito o Acess, Content-type, Authorization, Acept, Origin, X-Requested-With.

      this.app.use(cors());
      next(); //pq depois de fazer todas essas configurações ele tem que continuar para a requisição aonde ele está.
    });
  } //pega através de uma arrow function 3 parâmetros (requisição, resposta e next(por que ele é um middleware e o mesmo consegue pegar ou validar algum dado e mandar prosseguir pra rota que ele vai atuar)

  routes() {
    this.app.use(routes); //chama as rotas que a gente vai ter na aplicação.
  }
}

module.exports = new App().app; //além de exportar a classe App, também exporta o atributo .app, assim o server consegue ter acesso ao app que é o atributo que tem a instacia do express que consegue fazer o listen funcionar.

//middleware: Middleware é um software que fornece serviços e recursos comuns a aplicações. Gerenciamento de dados, serviços de aplicações, sistema de mensageria, autenticação e gerenciamento de APIs são recursos comumente operados por um software de middleware.

//cors: O CORS (Cross-origin Resource Sharing) é um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens. O CORS é uma especificação do W3C e faz uso de headers do HTTP para informar aos navegadores se determinado recurso pode ser ou não acessado.
