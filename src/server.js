const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db");

// configurar pasta publica
server.use(express.static("public"));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//configurar caminhos na minha aplicaçao
// pagina inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
  res.render("index.html", { title: "Um titulo" });
});

server.get("/create-point", (req, res) => {
  res.render("create-point.html");
});

server.get("/search", (req, res) => {
  // pegar os dados do banco de dados
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;

    //  mostrar a oagina html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });
  });
});

//ligar o servidor
server.listen(3333, () => console.log("Server is Running ON:3333"));
