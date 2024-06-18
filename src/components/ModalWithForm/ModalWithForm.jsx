import "./ModalWithForm.css";
import AddItemModal from "../AddItemModal/AddItemModal";

function ModalWithForm( {children, buttonText, title, isOpen, onClose, handleSubmit} ) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose}>
        </button>
        <form className="modal__form">
            {children}
          <button type="submit" className="modal__submit" onSubmit={handleSubmit}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
