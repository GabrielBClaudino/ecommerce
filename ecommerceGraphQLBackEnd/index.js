const express = require("express");
const db = require("./db/db.js");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema/productSchema.js");
const resolvers = require("./resolver/productResolver.js");

const app = express();
const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

const startServer = async () => {
  await server.start();

  server.applyMiddleware({ app });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
  });
}

startServer();