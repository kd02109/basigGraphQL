import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Home() {
  // Apollo provider가 제공하는 client에 접근하기
  const client = useApolloClient();
  console.log(client);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            movies {
              title
              id
              medium_cover_image
            }
          }
        `,
      })
      .then((data) => setMovies(data.data.movies))
      .catch((err) => console.log(err.response.data));
  }, [client]);
  return (
    <ul>
      {movies.map(({ title, id, medium_cover_image }) => (
        <div key={id}>
          <li>{title}</li>
          <img src={medium_cover_image} alt={title}></img>
        </div>
      ))}
    </ul>
  );
}
