//essa pasta só vai estaebelecer conexões com o banco de dados, essa conexão vai abrir a possibilidade de no futuro integrar com múltiplos bancos de dados.

const mongoose = require("mongoose"); //esse moongose será usado no dataBaseConnectionMongoDB

class Connection {
  //o método constructor ele chama tudo que está dentro dele, logo que a nossa connection é chamada em algum lugar, instânciada em algum lugar.
  constructor() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB() {
    //entre aspas coloque o endereço da base de dados dentro das aspas, mude o nome da sua base de dados após o /
    this.mongoDBConnection = mongoose
      .connect("mongodb://localhost/nodejs", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true, // para ver essas configurações vá para 1 ao final.
      })
      .then(() => {
        console.log("Conexão estabelecida com o MongoDB com sucesso");
      })
      .catch((error) => {
        console.log(`Error ao estabelecer conexão com mongoDB: ${error}`);
      }); // o then e o catch é pra saber se está funcionando.
  }
}

module.exports = new Connection();

//1 -pesquise no google mongoose npm e veja as configurações, copie e cole.
