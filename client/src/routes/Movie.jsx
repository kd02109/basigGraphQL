import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const MOVIE = gql`
  query movie($id: String!) {
    movie(id: $id) {
      title
      id
      medium_cover_image
      description_full
      isLiked @client #local state
    }
  }
`;

export default function Moive() {
  const param = useParams();
  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery(MOVIE, {
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
  const handleLike = () => {
    // fragment는 타입의 일부이다.
    // tyoe Movie의 fragment(조각)(일부)를 만들수 있다.
    cache.writeFragment({
      // 유니크한 ID 값을 활용하여 가지고 온다.
      id: `Movie:${param.id}`,
      fragment: gql`
        # fragmetn 이름은 자유롭게 작성할 수 있다. Movie는 graphQL 서버에서 가지고 온것으로
        # id의 type과 일치해야 한다.
        # 어떤 타입의 일부를 cache에 저장한다.
        # 어떤 데이터를 수정할지 apollo에 알려준다.
        fragment getMovie on Movie {
          isLiked
        }
      `,
      // 알려준 데이터를 무엇으로 수정할지 작성한다.
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };
  return (
    <ul>
      <div>
        <h2>{data.movie.title}</h2>
        <div>
          <img alt={data.movie.title} src={data.movie.medium_cover_image}></img>
        </div>
        <button onClick={handleLike}>
          {data?.movie?.isLiked ? "UnLike" : "Like"}
        </button>
        <p>{data.movie.description_full}</p>
        <hr />
      </div>
    </ul>
  );
}
