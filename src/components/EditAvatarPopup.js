import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const linkRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
    linkRef.current.value = "";
  }
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar-link"
        className="form__item form__item_user_avatar"
        type="url"
        ref={linkRef}
        name="avatarLink"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="input-avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
