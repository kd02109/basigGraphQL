// React JS의 Apollo Client가 GraphQl 서버와 통신하도록 구성

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  //graphQL 서버
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

client
  .query({
    //graphQL 을 통해 데이터 가지고 오기
    // 데이터를 정상적으로 받아오는지 확인하기
    query: gql`
      {
        movies {
          title
          id
        }
      }
    `,
  })
  .then((data) => console.log(data));

export default client;
