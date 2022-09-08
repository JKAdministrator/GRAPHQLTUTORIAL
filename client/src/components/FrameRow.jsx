import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_FRAME } from "../mutations/frameMutations";
import { GET_FRAMES } from "../queries/frameQueries";

export default function FrameRow({ frame }) {
  const [deleteFrame] = useMutation(DELETE_FRAME, {
    variables: { id: frame.id },
    refetchQueries: [{ query: GET_FRAMES }],
  });
  console.log("frame", { frame });
  return (
    <tr>
      <td>{frame.order}</td>
      <td>{frame.name}</td>
      <td>{frame.detail}</td>
      <td>{frame.serie.name}</td>
      <td>
        <button className="btn btn-danger sm-small" onClick={deleteFrame}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
