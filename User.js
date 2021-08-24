const mongoose = require("mongoose");

//O que são Schemas? Os Schemas são uma coleção de objetos dentro de um determinado database (banco de dados), servem para agrupar objetos no nível de aplicação como também para simplesmente fazer divisões departamentais. Schemas são bastante utilizados em padrões de sistema de banco de dados.
//Essev é nosso primeiro schema

const User = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, //Uma marca temporal, estampa de tempo ou timestamp é uma cadeia de caracteres denotando a hora ou data que certo evento ocorreu.
  }
);

module.exports = mongoose.model("user", User); //aqui você exporta o schema e usa o método model, recebe 2 parâmetros , como queremos que fique dentro do banco de dados e o objeto que define o schema desta tabela.
