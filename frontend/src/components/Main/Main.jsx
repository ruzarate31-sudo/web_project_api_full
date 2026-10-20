import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Popup from "./Popup/Popup.jsx";
import NewCard from "./Popup/NewCard/NewCard.jsx";
import EditProfile from "./Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./Popup/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import RemoveCard from "./Popup/RemoveCard/RemoveCard.jsx";

export default function Main(props) {

   const {
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit, 
  selectedCard,
  handleCardDelete,} = props;

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  const removeCardPopup = {
  title: "¿Estás seguro?",
  type: "delete",
  children: (
    <RemoveCard
      selectedCard={selectedCard}
      onCardDelete={handleCardDelete}
    />
  ),
};

return (
  <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
              alt="Avatar"
            />
            <button
              className="profile__avatar-edit-button"
              type="button"
              aria-label="Editar avatar"
              onClick={() => onOpenPopup(editAvatarPopup)}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__title">
              {currentUser.name}
            </h1>

            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
               onClick={() => onOpenPopup(editProfilePopup)}
            ></button>

            <p className="profile__description">
             {currentUser.about}
            </p>
          </div>

          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => onOpenPopup(newCardPopup)}/>
        </section>

        <section className="cards page__section">
            <ul className="cards__list">
                 {cards.map((card) => (
            <Card
             key={card._id}
             card={card}
             handleOpenPopup={onOpenPopup}    
             onCardLike={onCardLike}
             onCardDelete={onCardDelete}
            />
            ))}
            </ul>
         </section>

        {popup && (
        <Popup
        onClose={onClosePopup}
        title={popup.title}
        type={popup.type}
        >
       {popup.type === "delete"
         ? removeCardPopup.children
         : popup.children}
        </Popup>
     )}
      </main>
  )
}