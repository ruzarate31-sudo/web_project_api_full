import UseFormValidation from "../../hooks/UseFormValidation";
import { Link } from "react-router-dom";

function Login( { onLogin } ) {
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
    onLogin(values.email, values.password);
  }

  return (
    <main className="auth">
        <form className="auth__form" noValidate onSubmit={handleSubmit}>
            <h2 className="auth__title">Inicia sesión</h2>

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

           <button className="auth__button"
            type="submit"
            disabled={!isValid}
           >
           Inicia sesión
           </button>
        </form>
     <p className="auth__text">
        ¿Aún no eres miembro?{" "}
        <Link to="/signup" className="auth__link">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}

export default Login;