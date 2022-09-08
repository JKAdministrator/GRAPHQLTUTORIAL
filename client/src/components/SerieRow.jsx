import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_SERIE } from "../mutations/serieMutations";
import { GET_SERIES } from "../queries/serieQueries";

export default function ClientRow({ serie }) {
  const [deleteSerie] = useMutation(DELETE_SERIE, {
    variables: { id: serie.id },
    refetchQueries: [{ query: GET_SERIES }],
  });
  return (
    <tr>
      <td>{serie.order}</td>
      <td>{serie.name}</td>
      <td>{serie.detail}</td>
      <td>
        <button className="btn btn-danger sm-small" onClick={deleteSerie}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
