import React from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react"; 
import { useEffect } from "react"; 
import { CurrentUserContext } from "../../context/CurrentUserContext";

const EditProfileModal = ({ onSubmit, isOpen, onClose, buttonText }) => {
    const { currentUser } = React.useContext(CurrentUserContext); 
    const [userName, setUserName] = useState(currentUser.name); 
    const [avatar, setAvatarUrl] = useState(currentUser.avatar); 

    useEffect(() => {
        if (isOpen === true) {
            setUserName(userName);
            setAvatarUrl(avatarUrl);
        }    
    }, [isOpen]); 

    const handleNameChange = (event) => {
        setUserName(event.target.value); 
    }; 

    const handleAvatarUrl = (event) => {
        setAvatarUrl(event.target.value)
    }; 

    const newUserData = {
        name: userName,
        avatar: avatarUrl,
      };
    
      function handleSubmit(event) {
        event.preventDefault();
        onSubmit(newUserData);
      }

      return (
        <ModalWithForm 
            title="Change profile data"
            name="edit-profile"
            buttonText={buttonText}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="modal__inputs"> 
                <label className="modal__label">
                name*
                <input 
                  className="modal__input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={userName}
                  minLength="1"
                  maxLength="30"
                  onChange={handleNameChange}
                />
                </label>
                <label className="modal__label"> 
                  Avatar URL*
                <input
                  className="modal__input"
                  type="url"
                  name="link"
                  placeholder="Avatar URL"
                  value={avatar}
                  minLength="1"
                  maxLength="1000"
                  onChange={handleAvatarUrl}
                  /> 
                </label>
            </fieldset>
        </ModalWithForm>
      )
};

export default EditProfileModal;
