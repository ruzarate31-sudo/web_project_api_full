import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { authorize, register, checkToken } from "../utils/auth.js";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import "../index.css";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(() => localStorage.getItem("jwt") || "");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );
  const navigate = useNavigate();

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (isSuccess) {
      navigate("/signin");
    }
  }

  function handleLogin(email, password) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error(err);
      });
  }
  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.error(err);
      });
  }
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setIsLoggedIn(false);
    setEmail("");
    navigate("/signin");
  }
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    api
      .getUserInfo()
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        setIsLoggedIn(true);
        setEmail(userData.email);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setToken("");
        setIsLoggedIn(false);
        setEmail("");
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, [token]);

  async function handleUpdateUser(data) {
    try {
      const newData = await api.editUserInfo(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeleteClick(card) {
    setSelectedCard(card);

    handleOpenPopup({
      title: "¿Estás seguro?",
      type: "delete",
      children: null,
    });
  }

  async function handleUpdateAvatar(data) {
    try {
      const newData = await api.editAvatar(data.avatar);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
        setSelectedCard(null);
      })
      .catch((error) => console.error(error));
  }

  async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.addCard(data);

      setCards((state) => [newCard, ...state]);

      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }
  if (isCheckingToken) {
    return null;
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          onSignOut={handleSignOut}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="page__content">
                  <Main
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                    handleCardDelete={handleCardDelete}
                    selectedCard={selectedCard}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
