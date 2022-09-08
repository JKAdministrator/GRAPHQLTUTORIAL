import { useState, useRef } from "react";
import { FaUser, FaRegFileImage, FaImage } from "react-icons/fa";

import { useQuery, useMutation } from "@apollo/client";
import { GET_FRAMES } from "../queries/frameQueries";
import { GET_SERIES } from "../queries/serieQueries";
import { GET_IMAGES } from "../queries/imageQueries";
import { ADD_FRAME } from "../mutations/frameMutations";
import Spinner from "./Spinner";
import { useEffect } from "react";

export default function AddFrameModal() {
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [serieId, setSerieId] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    console.log("SELECTED IMAGES CHANGE", { selectedImages });
  }, [selectedImages]);
  const { loading, error, data } = useQuery(GET_SERIES);
  const {
    loading: loadingImages,
    error: errorImages,
    data: dataImages,
  } = useQuery(GET_IMAGES);

  const [addFrame] = useMutation(ADD_FRAME, {
    variables: {
      detail,
      name,
      order: parseInt(order),
      serieId,
      images: images.map((i) => {
        return i.data_url; // base64 data
      }),
    },
    update(cache, { data: { addFrame } }) {
      const { frames } = cache.readQuery({
        query: GET_FRAMES,
      });
      cache.writeQuery({
        query: GET_FRAMES,
        data: { frames: [...frames, addFrame] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      detail === "" ||
      name === "" ||
      order === "" ||
      serieId === "" ||
      images.length === 0
    ) {
      return false;
    }
    addFrame(detail, name, order, serieId, images);
    setDetail("");
    setName("");
    setOrder(0);
    setSerieId("");
    setImages([]);
    return true;
  };

  if (error || errorImages) return <p>Something went wrong</p>;
  if (loading || loadingImages) return <Spinner />;

  const sortedSeries = [...data.series].sort((a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else if (a.name === b.name) return 0;
  });

  const onFrameImageClick = (e) => {
    e.preventDefault();
    const imageKey = e.target.getAttribute("data-key");
    setSelectedImages((prevSelectedImages) => {
      const imageSelectedIndex = selectedImages.indexOf(imageKey);
      if (imageSelectedIndex === -1) return [...prevSelectedImages, imageKey];
      else {
        let newSelectedImages = [...prevSelectedImages];
        newSelectedImages.splice(imageSelectedIndex, 1);
        return newSelectedImages;
      }
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addFrameModal"
      >
        <div className="d-flex align-items-center">
          <FaImage className="icon" />
          <div>Add Frame</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addFrameModal"
        show="true"
        aria-labelledby="addFrameModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="modal-content needs-validation"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="addFrameModalLabel">
                Add Frame
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Order</label>
                <input
                  type="number"
                  className="form-control"
                  id="order"
                  value={order}
                  autoComplete="off"
                  onChange={(e) => setOrder(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  required
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
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Serie</label>
                <select
                  className="form-control"
                  id="serieId"
                  value={serieId}
                  autoComplete="off"
                  onChange={(e) => setSerieId(e.target.value)}
                  required
                >
                  {sortedSeries &&
                    sortedSeries.map((serie) => {
                      return (
                        <option key={serie.id} value={serie.id}>
                          {serie.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#addImageToFrameModal"
                >
                  <div className="d-flex align-items-center">
                    <FaRegFileImage className="icon" />
                    <div>Set Images</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="modal fade"
        id="addImageToFrameModal"
        show="true"
        aria-labelledby="addImageToFrameModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div
            onSubmit={onSubmit}
            autoComplete="off"
            className="modal-content needs-validation"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="addImageToFrameModalLabel">
                Set Frame Images
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-target="#addFrameModal"
                data-bs-toggle="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container text-center p-0">
                <div className="row row-cols-3">
                  {console.log("images", dataImages.images)}
                  {dataImages?.images &&
                    dataImages.images.map((imageData) => {
                      return (
                        <div
                          key={imageData.id}
                          className="image-item d-flex align-items-center justify-content-center p-1 m-0 "
                          style={{
                            position: "relative",
                            cursor: "pointer",
                          }}
                          data-key={imageData.id}
                          onClick={onFrameImageClick}
                        >
                          <img
                            src={imageData["secure_url"]}
                            alt=""
                            width="100"
                            className={`border ${
                              selectedImages.indexOf(imageData.id) > -1
                                ? "border-success border-5 shadow"
                                : ""
                            } `}
                            style={{
                              pointerEvents: "none",
                              width: ` ${
                                selectedImages.indexOf(imageData.id) > -1
                                  ? "100%"
                                  : "80%"
                              }`,
                              opacity: ` ${
                                selectedImages.indexOf(imageData.id) > -1
                                  ? "1.0"
                                  : "0.7"
                              }`,
                              height: "auto",
                              objectFit: "scale-down",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-target="#addFrameModal"
                data-bs-toggle="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
