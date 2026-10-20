import successIcon from "../../images/success-icon.svg";
import failIcon from "../../images/fail-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup__content">
        <button
          aria-label="Close modal"
          type="button"
          onClick={onClose}
          className="popup__close"
        />
        <img
          className="popup__tooltip-icon"
          src={isSuccess ? successIcon : failIcon}
          alt=""
        />
        <p className="popup__tooltip-message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;