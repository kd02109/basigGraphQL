import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fetch from "node-fetch";

const resolvers = {
  Query: {
    movies() {
      return fetch("https://yts.mx/api/v2/list_movies.json")
        .then((res) => res.json())
        .then((json) => json.data.movies);
    },
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          return json.data.movie;
        });
    },
  },
};

const typeDefs = `#graphql
type Movie {    
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String! 
    title_long: String!
    slug: String
    year: Int!
    rating: Float
    runtime: Int!
    genres: [String!]
    summary: String
    description_full: String
    synopsis: String
    yt_trailer_code: String
    language: String!
    mpa_rating: String
    background_image: String!
    background_image_original: String!
    small_cover_image: String
    medium_cover_image: String!
    large_cover_image: String!
    state: String
    torrents: [Torrent]
    date_uploaded: String
    date_uploaded_unix:String
}

type Torrent{
    url: String
    hash: String
    quality: String
    type: String
    seeds: Int
    peers: Int
    size: String
    size_bytes: Int
    date_uploaded: String
    date_uploaded_unix:String
}

type Query{
    movies : [Movie!]!
    movie(id:String!): Movie
}

`;
const server = new ApolloServer({ typeDefs, resolvers }); //type Query는 반드시 주어져야한다.

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
