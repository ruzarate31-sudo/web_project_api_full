import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";

function Header({ isLoggedIn, email, onSignOut }) {
  const location = useLocation();
  const isSignInPage = location.pathname === "/signin";

  return (      
 <header className="header page__section">
        <img
          alt="Around the U.S logo"
          className="logo header__logo"
          src={Logo}
        />
        {isLoggedIn ? (
          <div className="header__user">
            <span className="header__email">{email}</span>
            <button className="header__button" type="button" onClick={onSignOut}>
              Cerrar sesión
            </button>
            </div>
        ) : (
          <Link className="header__link" to={isSignInPage ? "/signup" : "/signin"}>
            {isSignInPage ? "Regístrate" : "Iniciar sesión"}
          </Link>
        )}
      </header>
);
} 

export default Header