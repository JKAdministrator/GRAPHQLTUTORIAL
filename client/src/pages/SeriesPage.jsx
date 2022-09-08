import AddSerieModal from "../components/AddSerieModal";
import Series from "../components/Series";

export default function SeriesPage() {
  return (
    <>
      <div className="container-fluid gap-3 m-4">
        <AddSerieModal />
      </div>
      <hr />
      <Series />
    </>
  );
}
