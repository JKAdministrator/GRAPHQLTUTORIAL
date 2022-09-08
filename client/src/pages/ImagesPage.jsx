import AddImageModal from "../components/AddImageModal";
import Images from "../components/Images";

export default function SeriesPage() {
  return (
    <>
      <div className="container-fluid gap-3 m-4">
        <AddImageModal />
      </div>
      <hr />
      <Images />
    </>
  );
}
