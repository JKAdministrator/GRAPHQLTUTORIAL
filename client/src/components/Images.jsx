import { useQuery } from "@apollo/client";
import ImageRow from "./ImageRow";
import { GET_IMAGES } from "../queries/imageQueries";
import Spinner from "./Spinner";
export default function Images() {
  const { loading, error, data } = useQuery(GET_IMAGES);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className="container-fluid row align-items-center justify-content-center gap-3 flex-wrap">
          {data.images.map((image) => {
            return <ImageRow key={image.id} image={image} />;
          })}
        </div>
      )}
    </>
  );
}
