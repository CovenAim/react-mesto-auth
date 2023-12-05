import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isAddPlacePopupOpen,
  closeAllPopups,
  onAddPlace,
  isLoading
}) {
  
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (!isAddPlacePopupOpen) {
      setName("");
      setLink("");
    }
  }, [isAddPlacePopupOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      buttonText={isLoading? "Добавляем...": "Добавить"}
    >
      <label className="popup__label">
        <input
          type="text"
          id="name-place"
          name="name-place"
          value={name}
          onChange={handleNameChange}
          placeholder="Название"
          className="add-form__text add-form__text_input_title popup__input"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="name-place-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          name="url"
          id="url"
          value={link}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          className="add-form__text add-form__text_input_url popup__input"
          required
        />
        <span className="url-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
