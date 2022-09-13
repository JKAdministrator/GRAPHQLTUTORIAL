import { FaTrash, FaEdit } from "react-icons/fa";
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
        <button
          title="Edit Experience"
          className="btn btn-light sm-small"
          data-bs-toggle="modal"
          data-bs-target="#addExperienceModal"
          data-bs-experience-id={experience.id}
        >
          <FaEdit />
        </button>
      </td>
      <td>
        <button
          title="Delete Experience"
          className="btn btn-danger sm-small"
          onClick={deleteExperience}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
