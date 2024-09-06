import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import api from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signIn, signUp, checkToken } from "../../utils/auth"

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const deleteConfirmModal = () => {
    setActiveModal("delete-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  // New Sign Up
  const handleSignUp = (newUser) => {
    setIsLoading(true);
    signUp({
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      avatarUrl: newUser.avatar,
    })
      .then(() => {
        handleLogin({ email: newUser.email, password: newUser.password });
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
      })
      .finally(() => setIsLoading(false));
  };

  //New Login
  const handleLogin = (user) => {
    setIsLoading(true);
    signIn(user.email, user.password)
      .then((data) => {
        return checkToken(data.token);
      })
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    api
      .addItems({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardDelete = () => {
    api
      .removeItems(selectedCard._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((c) => c._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleLoginModal={handleLoginModal}
            onLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            onAddButtonClick={onAddButtonClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                  onClose={closeActiveModal}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                  onClose={closeActiveModal}
                  onAddButtonClick={onAddButtonClick}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          onSubmit={onAddButtonClick}
          handleAddItemSubmit={handleAddItemSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onClick={deleteConfirmModal}
        />
        <DeleteConfirmModal
          isOpen={activeModal === "delete-garment"}
          closeActiveModal={closeActiveModal}
          handleCardDelete={handleCardDelete}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onSignUp={handleSignUp}
        />
        <LoginModal
          onClose={closeActiveModal}
          onSubmit={handleLogin}
          isOpen={activeModal === "login"}
          onLogin={handleLogin}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
