import { useQuery } from "@apollo/client";
import SerieRow from "./SerieRow";
import { GET_SERIES } from "../queries/serieQueries";
import Spinner from "./Spinner";
export default function Series() {
  const { loading, error, data } = useQuery(GET_SERIES);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  const sortedSeries = [...data.series].sort((a, b) => {
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
              <th>Order</th>
              <th>Name</th>
              <th>Detail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedSeries.map((serie) => {
              return <SerieRow key={serie.id} serie={serie} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
