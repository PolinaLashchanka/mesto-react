import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getUserInfo()
      .then(
        (res) => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
        },
        [userName, userDescription, userAvatar]
      )
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src={userAvatar}
              alt="фотография пользователя"
            />
            <div className="profile__avatar-edit">
              <button
                className="button profile__avatar-edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={onEditAvatar}
              ></button>
            </div>
          </div>
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__description">{userDescription}</p>
          <button
            className="button profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        {cards.map(({ _id, ...rest }) => (
          <Card key={_id} {...rest} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
