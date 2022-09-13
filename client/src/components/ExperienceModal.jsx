import { useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPERIENCES, GET_EXPERIENCE } from "../queries/experienceQueries";
import {
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "../mutations/experienceMutations";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useLazyQuery } from "@apollo/client";

export default function ExperienceModal() {
  const [detail, setDetail] = useState("");
  const [year, setYear] = useState("");
  const [order, setOrder] = useState("");
  const [experienceId, setExperienceId] = useState("");

  const experienceModalRef = useRef();

  const [getExperienceData, { loading, error, data }] =
    useLazyQuery(GET_EXPERIENCE);

  const [addExperience] = useMutation(ADD_EXPERIENCE, {
    variables: {
      detail: detail,
      year: year,
      order: parseInt(order),
    },
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

  const [updateExperience] = useMutation(UPDATE_EXPERIENCE, {
    variables: {
      id: experienceId,
      detail: detail,
      year: year,
      order: parseInt(order),
    },
    update(cache, { data: { updateExperience } }) {
      console.log("updating cache");
      let { experiences } = cache.readQuery({
        query: GET_EXPERIENCES,
      });

      const filteredExperiences = experiences.filter((e) => {
        return e.id !== experienceId;
      });
      cache.writeQuery({
        query: GET_EXPERIENCES,
        data: { experiences: [...filteredExperiences, updateExperience] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (experienceId === "") addExperience(detail, year, order);
    else updateExperience(experienceId, detail, year, order);
    setDetail("");
    setYear("");
    setOrder("");
    setExperienceId("");
  };

  const onExperienceModalOpen = useCallback((event) => {
    setExperienceId(event.relatedTarget.getAttribute("data-bs-experience-id"));
  }, []);

  useEffect(() => {
    if (experienceModalRef)
      experienceModalRef?.current?.addEventListener(
        "show.bs.modal",
        onExperienceModalOpen
      );
  }, []);

  useEffect(() => {
    if (experienceId.length > 0) {
      getExperienceData({ variables: { id: experienceId } }).then((results) => {
        if (results?.data?.experience) {
          const experienceData = results?.data?.experience;
          setDetail(experienceData.detail ? experienceData.detail : "");
          setYear(experienceData.year ? experienceData.year : "");
          setOrder(experienceData.order ? experienceData.order : "");
        }
      });
    } else {
      setDetail("");
      setYear("");
      setOrder("");
    }
  }, [experienceId]);

  return (
    <>
      <div
        className="modal fade"
        show="true"
        id="addExperienceModal"
        aria-labelledby="addExperienceModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        ref={experienceModalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addExperienceModalLabel">
                {experienceId ? "Edit Experience" : "Add Experience"}
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
                    onChange={(e) => {
                      setOrder(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setDetail(e.target.value);
                    }}
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
