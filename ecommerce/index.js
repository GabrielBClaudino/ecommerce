const express = require("express");

const bodyParser = require("body-parser");
const loginRouter = require('./routes/authRoute.js');
const productRoutes = require("./routes/productRoute.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const userProfileRoutes = require("./routes/userProfileRoute.js");
const orderRoutes = require("./routes/orderRoute.js");
const cuponRoutes = require("./routes/cuponRoute.js");

const db = require("./db/db.js");

const app = express();
app.use(bodyParser.json()); // Para ler o corpo das requisições como JSON

app.use("/api", productRoutes);
app.use("/api", loginRouter);
app.use("/api", categoryRoutes);
app.use("/api", userProfileRoutes);
app.use("/api", orderRoutes);
app.use("/api", cuponRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});

//Produto criado basta agora mudar o src 
//onde seria o local da imagem para
//virar relamente um metodo de upload de imagem do produto