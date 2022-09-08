import AddExperienceModal from "../components/AddExperienceModal";
import Experiences from "../components/Experiences";

export default function ExperiencesPage() {
  return (
    <>
      <div className="container-fluid gap-3 m-4">
        <AddExperienceModal />
      </div>
      <hr />
      <Experiences />
    </>
  );
}
