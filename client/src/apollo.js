// React JS의 Apollo Client가 GraphQl 서버와 통신하도록 구성

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  //graphQL 서버
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
