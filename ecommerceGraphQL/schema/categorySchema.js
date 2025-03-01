const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        id: ID!
        name: String!
        description: String
    }

    type Query {
        categories: [Category]
        category(id: ID!): Category
    }

    type Mutation {
        createCategory(name: String!, description: String): Category
        updateCategory(id: ID!, name: String, description: String): Category
        deleteCategory(id: ID!): Boolean
    }
`;

module.exports = {typeDefs};