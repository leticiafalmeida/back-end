const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

class LoginController {
  async index(req, res) {
    //receber a requisição e validar se existe um usúario com esse nome.
    const { name, password } = req.body; // captura o nome e o passsword

    const userExist = await User.findOne({ name });

    if (!userExist) {
      return res.status(400).json({
        error: true,
        message: "Usuário não existe!",
      });
    }

    //comparação do user com a senha usando o bcrypt:

    if (!(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        message: "A senha está inválida!",
      });
    }

    // //RETORNAR O TOKEN: //yarn add jsonwebtoken

    return res.status(200).json({
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      token: jwt.sign({ id: userExist._id }, config.secret, {
        expiresIn: config.expireIn,
      }),
    });

    // return res.status(200).json({
    //   user: {
    //     name: "Leticia",
    //     email: "jswdfwiuefwqrof",
    //   },
    //   token: "ldsçnfvosandvoçaf",
    // });
  }
}

module.exports = new LoginController();
