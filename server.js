const app = require("./app");

const PORT = process.env.PORT || 8080; //se o process.env.PORT que geralmente está contido dentro dos servidores de hospedagem dessas APIS, se ele tive contido ele usa a porta correta de dentro do servidor se não ele usa o 8080.

app.listen(PORT, () => {
  console.log(`App listenner on port: ${PORT}`);
});
