import AddFrameModal from "../components/AddFrameModal";
import Frames from "../components/Frames";

export default function FramesPage() {
  return (
    <>
      <div className="container-fluid gap-3 m-4">
        <AddFrameModal />
      </div>
      <hr />
      <Frames />
    </>
  );
}
