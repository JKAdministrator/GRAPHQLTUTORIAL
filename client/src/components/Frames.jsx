import { useQuery } from "@apollo/client";
import FrameRow from "./FrameRow";
import { GET_FRAMES } from "../queries/frameQueries";
import Spinner from "./Spinner";
export default function Series() {
  const { loading, error, data } = useQuery(GET_FRAMES);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  const sortedFrames = [...data.frames].sort((a, b) => {
    if (a.order > b.order) return 1;
    else if (a.order < b.order) return -1;
    else if (a.order === b.order) return 0;
  });
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Order</th>
              <th>Name</th>
              <th>Detail</th>
              <th>Serie</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedFrames &&
              sortedFrames.map((frame) => {
                return <FrameRow key={frame.id} frame={frame} />;
              })}
          </tbody>
        </table>
      )}
    </>
  );
}
