const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
    price: Float!
    stock: Int!
    isbn: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type OrderItem {
    bookId: ID!
    title: String!
    quantity: Int!
    price: Float!
  }

  type Order {
    _id: ID!
    userId: ID!
    items: [OrderItem!]!
    totalPrice: Float!
    status: String!
    orderDate: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    users: [User]
    user(id: ID!): User
    orders: [Order]
    order(id: ID!): Order
  }

  type Mutation {
    createBook(title: String!, author: String!, price: Float!, stock: Int!, isbn: String): Book
    updateBook(id: ID!, stock: Int): Book
    deleteBook(id: ID!): String

    createUser(name: String!, email: String!): User

    createOrder(userId: ID!, items: [OrderInput!]!): Order
    updateOrderStatus(orderId: ID!, status: String!): Order
  }

  input OrderInput {
    bookId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;