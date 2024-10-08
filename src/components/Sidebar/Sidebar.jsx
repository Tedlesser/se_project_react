import React, { useContext } from "react";
import avatar from "../../assets/avatar.png";
import "./Sidebar.css";
import { CurrentUserContext } from "../../context/CurrentUserContext"; // Ensure correct import path

const SideBar = ({ onEditProfileModal, onSignout }) => {
  const { currentUser } = useContext(CurrentUserContext); // Correct useContext syntax

  return (
    <div className="sidebar">
      {currentUser ? (
        <div className="side-bar__profile">
          <img
            src={currentUser.avatar || avatar} // Fallback to default avatar if none provided
            alt={`${currentUser.name}'s avatar`}
            className="side-bar__avatar"
          />
          <p className="side-bar__name">{currentUser.name}</p>
        </div>
      ) : (
        <div className="side-bar__profile-avatar_placeholder" alt="User avatar">
          <p className="side-bar__profile-avatar_placeholder-initial">
            {/* Fallback logic can be improved depending on your requirements */}
            {/* {currentUser ? currentUser.name.charAt(0).toUpperCase() : "U"} */}
            U
          </p>
        </div>
      )}
      <button className="side-bar__edit-profile" onClick={onEditProfileModal}>
        Change profile data
      </button>
      <button className="side-bar__log-out" onClick={onSignout}>
        Log Out
      </button>
    </div>
  );
};

export default SideBar;
