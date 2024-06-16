import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./ClothesSection.css"

function ClothesSection({ onCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-header">
        <p className="clothes-items">Your Items</p>
        <button className="clothes-button">+ Add New</button>
      </div>
        <ul className="clothes-section__list">
          {clothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
    </div>
  );
}

export default ClothesSection;
