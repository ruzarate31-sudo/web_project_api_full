import UseFormValidation from "../../hooks/UseFormValidation";
import { Link } from "react-router-dom";

function Register( { onRegister } ) {
    const {
        values,
        errors,
        isValid,
        handleChange,
    } = UseFormValidation({
        email: "",
        password: "",
    });

    function handleSubmit(e) { 
        e.preventDefault();
        onRegister(values.email, values.password);
        }

    return (
        <main className="auth">
            <form className="auth__form" noValidate onSubmit={handleSubmit}>
                <h2 className="auth__title">
                    Regístrate
                    </h2>
                <label className="auth__field">
                    <input
                        className="auth__input"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                    <span className="auth__error">{errors.email}</span>
                </label>
                <label className="auth__field">
                    <input
                        className="auth__input"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                    <span className="auth__error">{errors.password}</span>
                </label>
                <button
                    className="auth__button"
                    type="submit"
                    disabled={!isValid}> 
                Regístrate
                </button>
            </form>
            <p className="auth__text">
            ¿Ya eres miembro?{" "}
            <Link to="/signin" className="auth__link">
               Inicia sesión aquí
           </Link>
         </p>
        </main>
    );
}

export default Register;
