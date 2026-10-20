import ImagePopup from "../../Popup/ImagePopup/ImagePopup";
import "../../../../blocks/card.css";
export default function Card(props) {
  const { handleOpenPopup, onCardLike, onCardDelete} = props;
  const { name, link, isLiked } = props.card;


  const cardLikeButtonClassName = `card__like-button ${
  isLiked ? 'card__like-button_is-active' : ''
}`;

  const imagePopup = {
    children: <ImagePopup card={props.card} />,
  };

  
       function handleLikeClick() {
        onCardLike(props.card);
        }
        function handleDeleteClick() {
        onCardDelete(props.card);
        }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />

       <div className="card__description">
      <h2 className="card__title">{name}</h2>

      <button
       aria-label="Botón Me gusta"
       className={cardLikeButtonClassName}
       type="button"
       onClick={handleLikeClick}
    />
</div>
    </li>
  );
}