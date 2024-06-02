import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ onAddButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" alt={logo} src={logo} />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={onAddButtonClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terence Tegegne</p>
        <img src={avatar} alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
