import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props);
  }

  return (
    <div className="photo-grid__card">
      <img
        className="photo-grid__image"
        src={props.link}
        alt="#"
        onClick={handleClick}
      />
      <button
        className="button photo-grid__card_delete-button"
        type="button"
        aria-label="Удалить"
      ></button>
      <div className="photo-grid__caption">
        <h2 className="photo-grid__text">{props.name}</h2>
        <div className="photo-grid__heart-section">
          <button
            className="button photo-grid__heart-button"
            type="button"
            aria-label="Лайк"
          ></button>
          <h5 className="photo-grid__heart-count">{props.likes.length}</h5>
        </div>
      </div>
    </div>
  );
}

export default Card;
