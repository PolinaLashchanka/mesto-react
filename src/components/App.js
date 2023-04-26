import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onCardClick={(card) => handleCardClick(card)}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        isClose={closeAllPopups}
      >
        <input
          id="input-name"
          className="form__item form__item_user_name"
          type="text"
          minLength="2"
          maxLength="40"
          name="userName"
          placeholder="Имя"
          required
        />
        <span id="input-name-error" className="popup__error"></span>
        <input
          id="input-description"
          className="form__item form__item_user_description"
          type="text"
          minLength="2"
          maxLength="200"
          name="userDescription"
          placeholder="О себе"
          required
        />
        <span id="input-description-error" className="popup__error"></span>
        <button className="button form__submit-button" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        isClose={closeAllPopups}
      >
        <input
          id="input-card-name"
          className="form__item form__item_card_name"
          type="text"
          minLength="2"
          maxLength="30"
          name="cardName"
          placeholder="Название"
          required
        />
        <span id="input-card-name-error" className="popup__error"></span>
        <input
          id="input-card-link"
          className="form__item form__item_card_image"
          type="url"
          name="cardImage"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="input-card-link-error" className="popup__error"></span>
        <button
          className="button form__submit-button form__submit-button_disabled"
          type="submit"
          disabled
        >
          Создать
        </button>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?">
        <button className="button popup__submit-button">Да</button>
      </PopupWithForm>
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        isClose={closeAllPopups}
      >
        <input
          id="input-avatar-link"
          className="form__item form__item_user_avatar"
          type="url"
          name="avatarLink"
          placeholder="Ссылка на аватар"
          required
        />
        <span id="input-avatar-link-error" className="popup__error"></span>
        <button
          className="button form__submit-button form__submit-button_disabled"
          type="submit"
          disabled
        >
          Сохранить
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
