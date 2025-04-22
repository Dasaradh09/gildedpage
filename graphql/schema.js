const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    price: Float!
    stock: Int!
    isbn: String!
  }

  input BookInput {
    title: String!
    author: String!
    price: Float!
    stock: Int!
    isbn: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UserInput {
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
    id: ID!
    customerId: ID!
    items: [OrderItem!]!
    totalPrice: Float!
    status: String
  }

  input OrderItemInput {
    bookId: ID!
    quantity: Int!
  }

  input OrderInput {
    customerId: ID!
    items: [OrderItemInput!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    users: [User!]!
    user(id: ID!): User
    orders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    createBook(input: BookInput!): Book
    updateBook(id: ID!, stock: Int!): Book
    deleteBook(id: ID!): String

    createUser(input: UserInput!): User
    updateUser(id: ID!, name: String!, email: String!): User
    deleteUser(id: ID!): String

    createOrder(input: OrderInput!): Order
    deleteOrder(orderId: ID!): String
    updateOrderStatus(orderId: ID!, status: String!): Order
  }
`;

module.exports = typeDefs;