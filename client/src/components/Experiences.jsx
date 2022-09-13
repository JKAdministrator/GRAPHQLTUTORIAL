import { useQuery } from "@apollo/client";
import ExperienceRow from "./ExperienceRow";
import { GET_EXPERIENCES } from "../queries/experienceQueries";
import Spinner from "./Spinner";
export default function Experiences() {
  const { loading, error, data } = useQuery(GET_EXPERIENCES);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  const sortedExperience = [...data.experiences].sort((a, b) => {
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
              <th>Year</th>
              <th>Detail</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedExperience.map((experience) => {
              return (
                <ExperienceRow key={experience.id} experience={experience} />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
