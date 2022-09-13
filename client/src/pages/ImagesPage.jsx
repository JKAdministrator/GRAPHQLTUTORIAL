import ImageModal from "../components/ImageModal";
import ImageViewModal from "../components/ImageViewModal";
import Images from "../components/Images";

import { FaRegFileImage } from "react-icons/fa";

export default function SeriesPage() {
  return (
    <>
      <ImageModal />
      <ImageViewModal />
      <div className="container-fluid gap-3 m-4">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#addImageModal"
        >
          <div className="d-flex align-items-center">
            <FaRegFileImage className="icon" />
            <div>Add Image</div>
          </div>
        </button>
      </div>
      <hr />
      <Images />
    </>
  );
}
