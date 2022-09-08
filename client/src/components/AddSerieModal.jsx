import { useState } from "react";
import { FaImages, FaUser } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SERIES } from "../queries/serieQueries";
import { ADD_SERIE } from "../mutations/serieMutations";
export default function AddSerieModal() {
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);

  const [addSerie] = useMutation(ADD_SERIE, {
    variables: { detail, name, order: parseInt(order) },
    update(cache, { data: { addSerie } }) {
      const { series } = cache.readQuery({
        query: GET_SERIES,
      });
      cache.writeQuery({
        query: GET_SERIES,
        data: { series: [...series, addSerie] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (detail === "" || name === "" || order === "") {
      return alert("Please fill in all fields");
    }
    addSerie(detail, name, order);
    setDetail("");
    setName("");
    setOrder(0);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addSerieModal"
      >
        <div className="d-flex align-items-center">
          <FaImages className="icon" />
          <div>Add Serie</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addSerieModal"
        aria-labelledby="addSerieModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSerieModalLabel">
                Add Serie
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
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    value={name}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
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
                  disabled={name ? false : true}
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
