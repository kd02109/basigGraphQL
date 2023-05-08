import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

//query에 어떤 이름을 사용해도 상관없다.
const Movies = gql`
  query getMovies {
    movies {
      title
      id
      medium_cover_image
    }
  }
`;

export default function Home() {
  // useQuey 사용하기
  const { loading, data, error } = useQuery(Movies);
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>404 Page does not found</h1>;
  }

  return (
    <ul>
      {data.movies.map(({ title, id, medium_cover_image }) => (
        <div key={id}>
          <h2>{title}</h2>
          <Link to={`/${id}`}>GO PAGE</Link>
          <div>
            <img alt={title} src={medium_cover_image}></img>
          </div>
          <hr />
        </div>
      ))}
    </ul>
  );
}
