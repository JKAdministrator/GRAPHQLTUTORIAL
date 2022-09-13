import { useState } from "react";
import { FaImages, FaUser } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SERIES, GET_SERIE } from "../queries/serieQueries";
import { ADD_SERIE, UPDATE_SERIE } from "../mutations/serieMutations";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
export default function AddSerieModal() {
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [serieId, setSerieId] = useState("");

  const serieModalRef = useRef();

  const [getSerieData, { loading, error, data }] = useLazyQuery(GET_SERIE);

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

  const [updateSerie] = useMutation(UPDATE_SERIE, {
    variables: {
      id: serieId,
      detail: detail,
      name: name,
      order: parseInt(order),
    },
    update(cache, { data: { updateSerie } }) {
      let { series } = cache.readQuery({
        query: GET_SERIES,
      });

      const filteredSeries = series.filter((e) => {
        return e.id !== serieId;
      });
      cache.writeQuery({
        query: GET_SERIES,
        data: { series: [...filteredSeries, updateSerie] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (serieId === "") addSerie(detail, name, order);
    else updateSerie(serieId, detail, name, order);
    setDetail("");
    setName("");
    setOrder("");
    setSerieId("");
  };

  const onSerieModalOpen = useCallback((event) => {
    setSerieId(event.relatedTarget.getAttribute("data-bs-serie-id"));
  }, []);

  useEffect(() => {
    if (serieModalRef)
      serieModalRef?.current?.addEventListener(
        "show.bs.modal",
        onSerieModalOpen
      );
  }, []);

  useEffect(() => {
    if (serieId.length > 0) {
      getSerieData({ variables: { id: serieId } }).then((results) => {
        if (results?.data?.serie) {
          const serieData = results?.data?.serie;
          setDetail(serieData.detail ? serieData.detail : "");
          setName(serieData.name ? serieData.name : "");
          setOrder(serieData.order ? serieData.order : "");
        }
      });
    } else {
      setDetail("");
      setName("");
      setOrder("");
    }
  }, [serieId]);

  return (
    <>
      <div
        className="modal fade"
        id="addSerieModal"
        aria-labelledby="addSerieModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        ref={serieModalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSerieModalLabel">
                {serieId ? "Edit Serie" : "Add Serie"}
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
