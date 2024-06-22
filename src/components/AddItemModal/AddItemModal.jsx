import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import App from "../App/App";

const AddItemModal = ({
  activeModal,
  closeActiveModal,
  onSubmit,
  handleAddItemSubmit,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl });
    closeActiveModal();
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      isOpen={activeModal}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name {""}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image {""}
        <input
          type="Url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="radio"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="radio"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="radio"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
