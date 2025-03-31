const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        image: String!
        price: Float!
        storage: Int!
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
    }

    type Mutation {
        createProduct(name: String!, image: String!, price: Float!, storage: Int!): Product
        updateProduct(id: ID!, name: String, image: String, price: Float, storage: Int): Product
        deleteProduct(id: ID!): Boolean
    }
`;

module.exports = {typeDefs};