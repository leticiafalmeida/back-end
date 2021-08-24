const { Router } = require("express"); //importa o router de dentro do require express

const AuthMidlleware = require("./app/Midllewares/AuthMidlleware");

const LoginController = require("./app/Controllers/LoginController");

const UserController = require("./app/Controllers/UserController");

const routes = new Router(); //vai instaciar um objeto do router, então tudo que tem dentro do router o nosso routes tem.

routes.post("/user", UserController.store); //criar o caminho dessa rota, caminho raiz e qual o arquivo que vai receber essa requisição, no caso UserController, quando for feita uma requisição nessa rota eu vou passar a requisição para esse meu arquivo na rota store.
//AuthMidlleware intercepta essa requisição.

routes.get("/user", AuthMidlleware, UserController.show); //criar o caminho dessa rota, caminho raiz e qual o arquivo que vai receber essa requisição, no caso UserController, quando for feita uma requisição nessa rota eu vou passar a requisição para esse meu arquivo na rota show.

routes.post("/login", LoginController.index);

module.exports = routes; //então eu exporto esse modulo para que outros arquivos consigam utilizar.
