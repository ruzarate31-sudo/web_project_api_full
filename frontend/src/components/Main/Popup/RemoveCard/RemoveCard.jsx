export default function RemoveCard(props) {
  const { selectedCard, onCardDelete } = props;

  function handleSubmit(event) {
    event.preventDefault();

    onCardDelete(selectedCard);
  }

  return (
    <form
      className="popup__form"
      onSubmit={handleSubmit}
    >
      <button
        className="button popup__button"
        type="submit"
      >
        Sí
      </button>
    </form>
  );
}