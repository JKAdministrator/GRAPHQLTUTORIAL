import FrameModal from "../components/FrameModal";
import Frames from "../components/Frames";
import { FaImage } from "react-icons/fa";

export default function FramesPage() {
  return (
    <>
      <FrameModal />
      <div className="container-fluid gap-3 m-4">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#addFrameModal"
          data-bs-frame-id=""
        >
          <div className="d-flex align-items-center">
            <FaImage className="icon" />
            <div>Add Frame</div>
          </div>
        </button>
      </div>
      <hr />
      <Frames />
    </>
  );
}
