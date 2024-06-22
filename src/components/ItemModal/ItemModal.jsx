import "./ItemModal.css";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal"

function ItemModal({ activeModal, card, onClose, deleteConfirmModal }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__contents modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="title__box">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            onClick={DeleteConfirmModal}
            className="delete-card"
          >
            Delete Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
