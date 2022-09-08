import { Route, Routes } from "react-router-dom";
import SystemHeader from "../components/SystemHeader";
import ExperiencesPage from "./ExperiencesPage";
import SeriesPage from "./SeriesPage";
import FramesPage from "./FramesPage";
import ImagesPage from "./ImagesPage";
import CloudinaryUsagePage from "./CloudinaryUsagePage";

export default function System() {
  return (
    <>
      <SystemHeader />
      <div className="container">
        <Routes>
          <Route path="/experiences" element={<ExperiencesPage />}></Route>
          <Route path="/series" element={<SeriesPage />}></Route>
          <Route path="/frames" element={<FramesPage />}></Route>
          <Route path="/images" element={<ImagesPage />}></Route>
          <Route
            path="/cloudinaryUsage"
            element={<CloudinaryUsagePage />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}
