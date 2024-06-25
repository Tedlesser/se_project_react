import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

function Header({ onAddButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="WTWR Logo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={onAddButtonClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__profile">
            <p className="header__username">Terence Tegegne</p>
            <img src={avatar} alt="avatar logo" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
