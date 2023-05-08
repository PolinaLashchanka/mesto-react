import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);


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

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsEditProfilePopupLoading(true);
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsEditProfilePopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    setIsEditAvatarPopupLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsEditAvatarPopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard({ name, link }) {
    setIsAddPlacePopupLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsAddPlacePopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onCardClick={(card) => handleCardClick(card)}
          onCardLike={(card) => handleCardLike(card)}
          cards={cards}
          onCardDelete={(card) => handleCardDelete(card)}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isEditProfilePopupLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isAddPlacePopupLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonName="Да"
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isEditAvatarPopupLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
