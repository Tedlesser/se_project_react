import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import api from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import LoginModal from "../LoginModal/LoginModal";
import { signIn, signUp, checkToken } from "../../utils/auth"
import EditProfileModal from "../EditProfileModal/EditProfileModal"

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
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate();


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

  const openProfileModal = () => {
    setActiveModal("profile-edit");
  }

  // New Sign Up
  const handleSignUp = (newUser) => {
    setIsLoading(true);
    signUp({
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      avatar: newUser.avatar,
    })
      .then(() => {
        handleLogin({ email: newUser.email, password: newUser.password });
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
      })
      .finally(() => setIsLoading(false));
  };

  //New Login
  const handleLogin = (newUser) => {
    setIsLoading(true);
    signIn(newUser.email, newUser.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((data) => {
        setIsAuthenticated(true);
        setCurrentUser(data);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Logout
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/");
  };

  // Handles edit profile changes
  const handleEditProfileSubmit = (newUserData) => {
    const token = localStorage.getItem("jwt"); 
    if(!token) {
      console.error("No token found, user might not be authenticated");
      return;
    }
    setIsLoading(true); 
      api
      .editUserProfile({ name:newUserData.name, avatar: newUserData.avatar, token})
      .then((updatedUser)=>{
        setCurrentUser(updatedUser);
        closeActiveModal()
      })
      .catch((error)=> {
        console.error("Error during sign up:", error)
      })
      .finally(()=> setIsLoading(false));
  }

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt"); 
    if(!token) {
      console.error("No token found, user might not be authenticated");
      return;
    }
    api
      .addItems({ name, imageUrl, weather, token })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt"); 
    if(!token) {
      console.error("No token found, user might not be authenticated");
      return;
    }
    api
      .removeItems(selectedCard._id, token)
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

  console.log(isAuthenticated)

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="page__content">
          <Header
            handleLoginModal={handleLoginModal}
            onLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            onAddButtonClick={onAddButtonClick}
            weatherData={weatherData}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            getInitial={() => {}}
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
                  onSignout={handleSignOut}
                  onEditProfileModal={openProfileModal}
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
        <EditProfileModal
          onClose={closeActiveModal}
          onClick={handleLogin}
          isOpen={activeModal === "profile-edit"}
          onSubmit={handleEditProfileSubmit}
        />
        <Footer />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
