//verificar se o token é valido ou não e qual usuário está tentando acessar

const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token de autenticação não existe!",
    });
  }

  //SEPARA O BEARER DO TOKEN:

  const [, token] = auth.split(" "); //separar coisas de dentro de uma array.

  //VERIFICAÇÃO SE O TOKEN EXISTE: NEXT OU MENSAGEM DE ERRO:

  try {
    //tente esse
    const decoded = await promisify(jwt.verify)(token, config.secret); // se ele está decodificado ou não

    if (!decoded) {
      return res.status(401).json({
        error: true,
        code: 130,
        message: "O token está expirado!",
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token está inválido!",
    });
  }
};
