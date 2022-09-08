import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_EXPERIENCE } from "../mutations/experienceMutations";
import { GET_EXPERIENCES } from "../queries/experienceQueries";

export default function ClientRow({ experience }) {
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE, {
    variables: { id: experience.id },
    refetchQueries: [{ query: GET_EXPERIENCES }],
  });
  return (
    <tr>
      <td>{experience.order}</td>
      <td>{experience.year}</td>
      <td>{experience.detail}</td>
      <td>
        <button className="btn btn-danger sm-small" onClick={deleteExperience}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
