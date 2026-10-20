import {useContext, useEffect} from "react";
import useFormValidation from "../../../../hooks/UseFormValidation";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {

     const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
   
     const { values, errors, isValid, handleChange, setValues } = useFormValidation({ name: currentUser.name || "", description: currentUser.about || ""    });
    

     useEffect(() => {
     setValues({
    name: currentUser.name || "",
    description: currentUser.about || "",
    });
    }, [currentUser, setValues]);

   function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
    name: values.name,
    about: values.description,
   });
  }

    return (
        <form className="popup__form"
        id="edit-profile-form"
        noValidate
        onSubmit={handleSubmit}
        >
            <h2 className="popup__title">{props.title}</h2>
            <label className="popup__field">
                <input
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="Nombre"
                type="text"
                required
                minLength="2"
                maxLength="40"
                value={values.name || ""}
                onChange={handleChange}
                />
               <span
            className={`popup__error popup__error_type_name ${ errors.name ? "popup__error_visible" : "" }`}
              > {errors.name} </span> 
             </label>
             <label className="popup__field">
                <input
                className="popup__input popup__input_type_description"
                name="description"
                placeholder="Acerca de mí"
                type="text"
                required
                minLength="2"
                maxLength="200"
                value={values.description || ""}
                onChange={handleChange}
                />
                <span className={`popup__error popup__error_type_description ${ errors.description ? "popup__error_visible" : ""  }`} >{errors.description}</span>
             </label>

             <button
             className={`button popup__button ${ !isValid ? "popup__button_disabled" : "" }`}
             type="submit"
             disabled={!isValid}
             >
                Guardar
             </button>
        </form>
    );
}