import SerieModal from "../components/SerieModal";
import Series from "../components/Series";
import { FaImages } from "react-icons/fa";
export default function SeriesPage() {
  return (
    <>
      <SerieModal />
      <div className="container-fluid gap-3 m-4">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#addSerieModal"
          data-bs-serie-id=""
        >
          <div className="d-flex align-items-center">
            <FaImages className="icon" />
            <div>Add Serie</div>
          </div>
        </button>
      </div>
      <hr />
      <Series />
    </>
  );
}
