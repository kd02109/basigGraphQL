import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const MOVIE = gql`
  query movie($id: String!) {
    movie(id: $id) {
      title
      id
      medium_cover_image
      summary
    }
  }
`;

export default function Moive() {
  const param = useParams();
  const { data, loading, error } = useQuery(MOVIE, {
    variables: {
      // 프로퍼티 키의 이름은 쿼리 설정시 사용한 $뒤의 변수 이름과 같아야 한다.
      id: param.id,
    },
  });
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>404 Page does not found</h1>;
  }

  return (
    <ul>
      <div>
        <h2>{data.movie.title}</h2>
        <div>
          <img alt={data.movie.title} src={data.movie.medium_cover_image}></img>
        </div>
        <hr />
      </div>
    </ul>
  );
}
