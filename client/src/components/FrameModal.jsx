import { useState, useRef, useCallback } from "react";
import { FaRegFileImage, FaImage } from "react-icons/fa";

import { useQuery, useMutation } from "@apollo/client";
import { GET_FRAMES, GET_FRAME } from "../queries/frameQueries";
import { GET_SERIES } from "../queries/serieQueries";
import { GET_IMAGES } from "../queries/imageQueries";
import { ADD_FRAME, UPDATE_FRAME } from "../mutations/frameMutations";
import Spinner from "./Spinner";
import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";
export default function FrameModal() {
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [serieId, setSerieId] = useState("");
  const [frameId, setFrameId] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [newSelectedImages, setNewSelectedImages] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const frameModalRef = useRef();

  const cleanComponentData = () => {
    console.log("cleanComponentData");
    setDetail("");
    setName("");
    setOrder(0);
    setSerieId("");
    setSelectedImages([]);
    setNewSelectedImages([]);
    setFrameId("");
  };

  const [
    getFrameData,
    {
      loading: loadingFrameQuery,
      error: errorFrameQuery,
      data: dataFrameQuery,
    },
  ] = useLazyQuery(GET_FRAME);

  const [getSeriesData, { loading: loading, error: error, data: data }] =
    useLazyQuery(GET_SERIES);

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
      images: selectedImages.map((i) => {
        return i.id;
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

  const [updateFrame] = useMutation(UPDATE_FRAME, {
    variables: {
      id: frameId,
      detail: detail,
      name: name,
      order: parseInt(order),
      serieId: serieId,
      images: selectedImages.map((i) => {
        return i.id;
      }),
    },
    update(cache, { data: { updateFrame } }) {
      let { frames } = cache.readQuery({
        query: GET_FRAMES,
      });

      const filteredFrames = frames.filter((e) => {
        return e.id !== frameId;
      });
      cache.writeQuery({
        query: GET_FRAMES,
        data: { frames: [...filteredFrames, updateFrame] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (frameId === "") addFrame(detail, name, order, serieId, selectedImages);
    else updateFrame(frameId, detail, name, order, serieId, selectedImages);
    cleanComponentData();
    return true;
  };

  const onFrameModalOpen = (event) => {
    setFrameId(event.relatedTarget.getAttribute("data-bs-frame-id"));
  };

  useEffect(() => {
    console.log("useEffect for component created");

    if (frameModalRef) {
      getSeriesData().then((results) => {
        const seriesData = results?.data?.series ? results?.data?.series : [];
        const sortedSeries = [...seriesData].sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else if (a.name === b.name) return 0;
          return 0;
        });
        setSeriesData(sortedSeries);

        frameModalRef?.current?.addEventListener(
          "show.bs.modal",
          onFrameModalOpen
        );
      });
    }
  }, []);

  useEffect(() => {
    console.log("useEffect for frameId ", { frameId });
    if (frameId?.length > 0) {
      getFrameData({ variables: { id: frameId } }).then((results) => {
        if (results?.data?.frame) {
          const frameData = results?.data?.frame;
          setName(frameData.name ? frameData.name : "");
          setOrder(frameData.order ? frameData.order : "");
          setDetail(frameData.detail ? frameData.detail : "");
          setSerieId(frameData.serie?.id ? frameData.serie?.id : "");
          setSelectedImages(frameData.images ? frameData.images : []);
          setNewSelectedImages(frameData.images ? frameData.images : []);
        }
      });
    } else {
      cleanComponentData();
    }
  }, [frameId]);

  const onFrameImageClick = (e) => {
    console.log("onFrameImageClick()");
    e.preventDefault();
    const imageKey = e.target.getAttribute("data-key");
    const imageSecureUrl = e.target.getAttribute("data-secure-url");
    setNewSelectedImages((prevNewSelectedImages) => {
      const imageSelectedIndex = newSelectedImages.findIndex((img) => {
        return imageKey === img.id;
      });
      if (imageSelectedIndex === -1)
        return [
          ...prevNewSelectedImages,
          { id: imageKey, secure_url: imageSecureUrl },
        ];
      else {
        let images = [...prevNewSelectedImages];
        images.splice(imageSelectedIndex, 1);
        return images;
      }
    });
  };

  const onChangeImagesClick = (e) => {
    console.log("onChangeImagesClick()");
    setSelectedImages(newSelectedImages);
    //setFrameId(frameId);
  };

  const onChangeImagesCancelClick = (e) => {
    console.log("onChangeImagesCancelClick()");
    setNewSelectedImages(selectedImages);
    //setFrameId(frameId);
  };

  return (
    <>
      <div
        className="modal fade"
        id="addFrameModal"
        show="true"
        aria-labelledby="addFrameModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        ref={frameModalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <form autoComplete="off" className="modal-content needs-validation">
            <div className="modal-header">
              <h5 className="modal-title" id="addFrameModalLabel">
                Add Frame
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cleanComponentData}
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
                  <option key="NO_SERIE" value=""></option>
                  {seriesData &&
                    seriesData.map((serie) => {
                      return (
                        <option key={serie.id} value={serie.id}>
                          {serie.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div
                className="mb-3 d-flex flex-row align-items-center justify-content-start gap-2"
                style={{
                  maxWidth: "100%",
                  overflowY: "auto",
                }}
              >
                {selectedImages.map((imageData) => {
                  return (
                    <img
                      key={imageData.id}
                      src={imageData.secure_url}
                      alt=""
                      style={{
                        pointerEvents: "none",
                        width: "8rem",
                        opacity: "1.0",
                        height: "auto",
                        objectFit: "scale-down",
                        objectPosition: "center",
                      }}
                    />
                  );
                })}
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
                onClick={onSubmit}
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
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down">
          <div autoComplete="off" className="modal-content needs-validation">
            <div className="modal-header">
              <h5 className="modal-title" id="addImageToFrameModalLabel">
                Set Frame Images
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-target="#addFrameModal"
                data-bs-toggle="modal"
                data-bs-frame-id={frameId}
                onClick={onChangeImagesCancelClick}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container text-center p-0">
                <div className="row row-cols-3">
                  {dataImages &&
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
                          data-secure-url={imageData["secure_url"]}
                          onClick={onFrameImageClick}
                        >
                          <img
                            src={imageData["secure_url"]}
                            alt=""
                            width="100"
                            className={`border ${
                              newSelectedImages.findIndex((i) => {
                                return imageData.id === i.id;
                              }) > -1
                                ? "border-success border-5 shadow"
                                : ""
                            } `}
                            style={{
                              pointerEvents: "none",
                              width: ` ${
                                newSelectedImages.findIndex((i) => {
                                  return imageData.id === i.id;
                                }) > -1
                                  ? "100%"
                                  : "80%"
                              }`,
                              opacity: ` ${
                                newSelectedImages.findIndex((i) => {
                                  return imageData.id === i.id;
                                }) > -1
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
                data-bs-frame-id={frameId}
                onClick={onChangeImagesClick}
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
