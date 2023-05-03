import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//fake db
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    id: "1",
    buyersID: ["1", "2"],
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    id: "2",
    buyersID: ["1"],
  },
];
const users = [
  {
    id: "1",
    firstName: "Jun",
    lastName: "Son",
  },
  {
    id: "2",
    firstName: "Seok",
    lastName: "Son",
  },
];
const resolvers = {
  Query: {
    books() {
      console.log("I'm called");
      return books;
    },
    book(root, args) {
      console.log(root);
      console.log(id);
      return books.filter((item) => item.id === id)[0];
    },
    users() {
      return users;
    },
  },
  Mutation: {
    postBook(root, { title, author }) {
      const obj = { title, author, id: `${books.length + 1}` };
      books.push(obj);
      return obj;
    },
    addBuyers(root, { bookId, userId }) {
      const findBook = books.find((item) => item.id === bookId);
      if (!findBook) return "찾는 책이 없습니다.";
      const findUser = users.find((item) => item.id === userId);
      if (!findUser) return "해당 유저는 없습니다.";

      if (findBook.buyersID.includes(findUser.id)) {
        return "이미 책을 구입하셨습니다.";
      } else {
        findBook.buyersID.push(findUser.id);
      }
      return "책 구입에 성공했습니다.";
    },
  },
  User: {
    fullName(root) {
      return root.firstName + " " + root.lastName;
    },
  },
  Book: {
    BuyUsers({ buyersID }) {
      return users.filter((user) => buyersID.includes(user.id));
    },
  },
};

//schema definition language
const typeDefs = `#graphql
  """
  책의 목록들을 보여줍니다.
  """
  type Book {
    title: String!
    author: String!
    id: ID!
    buyersID : [String]
    BuyUsers : [User]
  }
  """
  유저 정보를 제공합니다.
  """
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  #GET DATA

  type Query {
    """
    모든 책 목록을 가지고 옵니다.
    """
    books: [Book!]!
    """
    책 한권을 조회합니다.
    """
    book(id:ID): Book
    users : [User!]!
    findUsers(bookId:ID!) : [Book]
  }
  # UPDATE, DELETE, POST DATA
  type Mutation{
    postBook(title:String!, author:String!) : Book
    addBuyers(bookId:ID!, userId:ID!) : String!
  }
`;
const server = new ApolloServer({ typeDefs, resolvers }); //type Query는 반드시 주어져야한다.

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
