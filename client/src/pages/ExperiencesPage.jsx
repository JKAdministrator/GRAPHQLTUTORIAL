import ExperienceModal from "../components/ExperienceModal";
import Experiences from "../components/Experiences";

import { FaRegNewspaper } from "react-icons/fa";

export default function ExperiencesPage() {
  return (
    <>
      <ExperienceModal />
      <div className="container-fluid gap-3 m-4">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#addExperienceModal"
          data-bs-experience-id=""
        >
          <div className="d-flex align-items-center">
            <FaRegNewspaper className="icon" />
            <div>Add Experience</div>
          </div>
        </button>
      </div>
      <hr />
      <Experiences />
    </>
  );
}
