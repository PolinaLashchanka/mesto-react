import {useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
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
        buttonName="Сохранить"
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
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        isClose={closeAllPopups}
        buttonName="Создать"
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
      </PopupWithForm>
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonName="Да"
      ></PopupWithForm>
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        isClose={closeAllPopups}
        buttonName="Сохранить"
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
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
