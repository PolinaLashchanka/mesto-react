import {useEffect, useState} from 'react';
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userData, cards]) => {
      setUserName(userData.name);
          setUserDescription(userData.about);
          setUserAvatar(userData.avatar);
          setCards(cards);
    }).catch((err) => console.log(err));
  }, [])

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
