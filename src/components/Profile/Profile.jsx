import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css"

function Profile({ onCardClick, clothingItems, onClose }) {
    return <div className="Profile">
        <section className="profile__sidebar">
            <Sidebar/>
        </section>
        <section className="profile__clothes">
            <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} onClose={onClose}/>
        </section>
    </div>
}

export default Profile;

