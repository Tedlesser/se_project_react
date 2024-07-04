import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

function Profile({ onCardClick, onAddButtonClick, clothingItems }) {
  return (
    <div className="Profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          onCardClick={onCardClick}
          onAddButtonClick={onAddButtonClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
