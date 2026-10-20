import { useContext } from "react";
import useFormValidation from "../../../../hooks/UseFormValidation";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import "../../../../blocks/popup.css";

export default function EditAvatar() {

  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormValidation();

 function handleSubmit(event) {
  event.preventDefault();
  
  handleUpdateAvatar({
  avatar: values.avatar,
  });
}
  return (
    <form
      className="popup__form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace de la imagen"
          type="url"
          required
          value={values.avatar || ""}
          onChange={handleChange}
        />

      <span className={`popup__error popup__error_type_avatar ${ errors.avatar ? "popup__error_visible" : "" }`}> {errors.avatar} </span>
      </label>
      <button
        className={`button popup__button ${
         !isValid ? "popup__button_disabled" : ""
         }`}
        type="submit"
        disabled={!isValid}
       >
        Guardar
      </button>
    </form>
  );
}