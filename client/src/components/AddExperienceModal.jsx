import { useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPERIENCES } from "../queries/experienceQueries";
import { ADD_EXPERIENCE } from "../mutations/experienceMutations";
export default function AddExperienceModal() {
  const [detail, setDetail] = useState("");
  const [year, setYear] = useState("");
  const [order, setOrder] = useState(0);

  const [addExperience] = useMutation(ADD_EXPERIENCE, {
    variables: { detail, year, order: parseInt(order) },
    update(cache, { data: { addExperience } }) {
      const { experiences } = cache.readQuery({
        query: GET_EXPERIENCES,
      });
      cache.writeQuery({
        query: GET_EXPERIENCES,
        data: { experiences: [...experiences, addExperience] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (detail === "" || year === "" || order === "") {
      return alert("Please fill in all fields");
    }
    addExperience(detail, year, order);
    setDetail("");
    setYear("");
    setOrder(0);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addExperienceModal"
      >
        <div className="d-flex align-items-center">
          <FaRegNewspaper className="icon" />
          <div>Add Experience</div>
        </div>
      </button>

      <div
        className="modal fade"
        show="true"
        id="addExperienceModal"
        aria-labelledby="addExperienceModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addExperienceModalLabel">
                Add Experience
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit} autoComplete="off">
                <div className="mb-3">
                  <label className="form-label">Order</label>
                  <input
                    type="numeric"
                    className="form-control"
                    id="order"
                    value={order}
                    autoComplete="off"
                    onChange={(e) => setOrder(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input
                    type="text"
                    className="form-control"
                    id="year"
                    value={year}
                    autoComplete="off"
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Detail</label>
                  <input
                    type="text"
                    className="form-control"
                    id="detail"
                    value={detail}
                    autoComplete="off"
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
