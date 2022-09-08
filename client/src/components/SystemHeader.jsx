import { useState } from "react";
import { useEffect } from "react";
import {
  FaDatabase,
  FaSignOutAlt,
  FaImage,
  FaImages,
  FaRegNewspaper,
  FaRegFileImage,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sectionName, setSectionName] = useState("");

  const onButtonClick = (e) => {
    e.preventDefault();
    navigate(e.target.getAttribute("data-route"));
  };

  useEffect(() => {
    let path = location.pathname.split("/").pop();
    path = path.charAt(0).toUpperCase() + path.slice(1);
    setSectionName(path);
  }, [location.pathname]);

  return (
    <nav className="navbar bg-light sticky-top">
      <div className="container-fluid container-fluid align-items-center justify-content-start">
        <a className="navbar-brand">Luisa Pagola</a>
        <h1 className="h5 lead mb-0 ">{sectionName}</h1>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          title="menu"
          style={{
            marginLeft: "auto",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Luisa Pagola
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul
              className="navbar-nav justify-content-start flex-grow-1 pe-3"
              style={{ height: "100%" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  data-route="/system/experiences"
                  onClick={onButtonClick}
                  href="#"
                >
                  <FaRegNewspaper className="icon" />
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  data-route="/system/series"
                  onClick={onButtonClick}
                  href="#"
                >
                  <FaImages className="icon" />
                  Series
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  data-route="/system/frames"
                  onClick={onButtonClick}
                  href="#"
                >
                  <FaImage className="icon" />
                  Frames
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  data-route="/system/images"
                  onClick={onButtonClick}
                  href="#"
                >
                  <FaRegFileImage className="icon" />
                  Images
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  data-route="/system/cloudinaryUsage"
                  onClick={onButtonClick}
                  href="#"
                >
                  <FaDatabase className="icon" />
                  Cloudinary usage
                </a>
              </li>
              <li className="nav-item mt-auto">
                <a
                  className="nav-link text-end"
                  aria-current="page"
                  data-route="/"
                  onClick={onButtonClick}
                  href="#"
                  style={{ marginTop: "auto" }}
                >
                  <FaSignOutAlt className="icon" />
                  Exit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
