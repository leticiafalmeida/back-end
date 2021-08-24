const User = require("../Models/User");
const bcrypt = require("bcryptjs"); //instalou no console yarn add bcryptjs. bcrypt é um método de criptografia do tipo hash para senhas baseado no Blowfish. .O método é conhecido como hash adaptativo às melhorias futuras de hardware por ter esta característica, pois pode permanecer resistente à ataques do tipo "força-bruta" com o tempo usando custos maiores de processamento.
const yup = require("yup");

class UserController {
  show(req, res) {
    var users = ["Kaio", "Larissa", "Danver"];

    return res.status(200).json({
      error: false,
      users,
    });
  }

  //assim que se insere dados dentro do mongo DB através do mongoose
  async store(req, res) {
    //async: São métodos que podem executar assincronamente, ou seja, quem chamou não precisa esperar por sua execução e ela pode continuar normalmente sem bloquear a aplicação, assim quando o método assíncrono chamado termina ele pode voltar para o ponto em que foi chamado e dar continuidade ao que estava fazendo.

    //VALIDAÇÃO ATRAVÉS DO YUP SCHEMA: inicio

    //instalamos o yarn add yup, é uma ferramenta que trabalha através de schemas, pesquise no google yup npm e defina os padrões: (não esqueça de importar lá me cima)

    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    //para fazer uma validação eficiente a gente pega os dados da nossa requisição, ou seja, schema é válido, é o parâmetro é os dados que eu quero que ele valide:
    //se o retorno desse dado é falso, retorne o erro:
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    //VALIDAÇÃO ATRAVÉS DO YUP SCHEMA: fim

    //VALIDAÇÃO NO BANCO DE DADOS
    //VERIFICA SE O USUÁRIO JÁ EXISTE:

    let userExist = await User.findOne({ name: req.body.name });
    if (userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe!",
      });
    }

    //DESESTRUTURAÇÃO DOS DADOS DA REQUISIÇÃO:

    const { name, email, password } = req.body;

    //CRIAÇÃO DA CONSTANTE DATA:

    const data = { name, email, password };

    //CRIPTOGRAFAR A SENHA:

    //antes de inserir no banco de dados ele vai transformar o data.password em uma criptografia
    data.password = await bcrypt.hash(data.password, 8); //essa função vai gerar uma criptografia da minha senha

    //INSERÇÃO NO BANCO DE DADOS:

    //await: esperar a resposta dessa requisição
    await User.create(data, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Error ao tentar inserir usuário no MongoDB",
        });
      return res.status(200).json({
        //200 é ok!
        error: false,
        message: "Usuário cadastrado com sucesso",
      });
    });
  }
}

module.exports = new UserController();
