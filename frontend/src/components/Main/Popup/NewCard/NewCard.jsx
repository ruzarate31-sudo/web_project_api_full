import useFormValidation from "../../../../hooks/UseFormValidation";
import "../../../../blocks/popup.css";

export default function NewCard(props) {

  const { onAddPlaceSubmit } = props; 
  const {
  values,
  errors,
  isValid,
  handleChange,
  resetForm,
} = useFormValidation();

function handleSubmit(event) {
  event.preventDefault();

  onAddPlaceSubmit({
    name: values["card-name"],
    link: values.link,
  })
  resetForm();
}

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="2"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={values["card-name"] || ""}
          onChange={handleChange}
        />

        <span
        className={`popup__error ${ errors["card-name"] ? "popup__error_visible" : ""}`}
        >{errors["card-name"]}</span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={values.link || ""}
          onChange={handleChange}
        />
        <span className={`popup__error ${ errors.link ? "popup__error_visible" : "" }`}
>{errors.link}</span>
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