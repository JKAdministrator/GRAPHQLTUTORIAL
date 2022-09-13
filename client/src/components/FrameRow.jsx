import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_FRAME } from "../mutations/frameMutations";
import { GET_FRAMES } from "../queries/frameQueries";

export default function FrameRow({ frame }) {
  const [deleteFrame] = useMutation(DELETE_FRAME, {
    variables: { id: frame.id },
    refetchQueries: [{ query: GET_FRAMES }],
  });
  return (
    <tr>
      <td>
        <img
          src={frame.images[0].secure_url}
          alt=""
          style={{
            pointerEvents: "none",
            width: "8rem",
            opacity: "1.0",
            height: "auto",
            objectFit: "scale-down",
            objectPosition: "center",
          }}
        />
      </td>
      <td>{frame.order}</td>
      <td>{frame.name}</td>
      <td>{frame.detail}</td>
      <td>{frame.serie.name}</td>
      <td>
        <button
          title="Edit Frame"
          className="btn btn-light sm-small"
          data-bs-toggle="modal"
          data-bs-target="#addFrameModal"
          data-bs-frame-id={frame.id}
        >
          <FaEdit />
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger sm-small"
          onClick={deleteFrame}
          title="Delete Frame"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
