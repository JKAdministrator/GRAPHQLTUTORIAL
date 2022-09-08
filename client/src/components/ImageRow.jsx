import { FaTrash, FaEllipsisH, FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_IMAGE } from "../mutations/imageMutations";
import { GET_IMAGES } from "../queries/imageQueries";
import { useState } from "react";

export default function ImageRow({ image }) {
  const [isHover, setIsHover] = useState(false);

  const [deleteImage] = useMutation(DELETE_IMAGE, {
    variables: { id: image.id },
    refetchQueries: [{ query: GET_IMAGES }],
  });

  return (
    <figure
      className={`figure border ${isHover ? "shadow" : ""} bg-body rounded`}
      style={{ position: "relative", width: "32%", height: "15rem" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={image.secure_url}
        className="figure-img img-fluid rounded"
        alt=""
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <figcaption className="figure-caption"></figcaption>
      {isHover && (
        <div
          className="dropdown"
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
        >
          <a
            className="btn btn-light"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaEllipsisH className="icon" />
          </a>

          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item d-flex flex-row gap-2 align-items-center">
                <FaEdit className="icon" />
                <label>Edit</label>
              </button>
            </li>
            <li>
              <button
                className="dropdown-item  d-flex flex-row gap-2 align-items-center"
                onClick={deleteImage}
              >
                <FaTrash className="icon" />
                <label>Delete</label>
              </button>
            </li>
          </ul>
        </div>
      )}
    </figure>
  );
}
