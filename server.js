import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

//schema definition language
const typeDefs = `#graphql
  type Book {
    title: String!
    author: String!
    id: ID!
  }
  #GET DATA
  type Query {
    books: [Book!]!
    book(id:ID): Book
  }
  # UPDATE, DELETE, POST DATA
  type Mutation{
    postBook(title:String, author:String) : Book
  }
`;
const server = new ApolloServer({ typeDefs }); //type Query는 반드시 주어져야한다.

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
