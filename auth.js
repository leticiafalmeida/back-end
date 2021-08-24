//esse arquivo vai guardar algumas variáveis
//configurações do JWT

module.exports = {
  secret: "adde992dd7e3e37d03076067125056ae345090c3e6c6a66eda81fc5e0a8b0c3f",
  expireIn: "6h",
};

//secrets é uma chave do nosso lado que a gente vai definir: só entrar no google e colocar cha256: cha256 online, lá você escreve uma chave no caso foi primeirodesafioestagio e ele converteu em um secrect.

//expireIn: em quanto tempo esse token vai expirar. Se precisar de mais segurança menos tempo, se precisar de um pouco menos de segurança defina mais tempo.
