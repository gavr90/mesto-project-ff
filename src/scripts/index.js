import "../pages/index.css";
import { initialCards } from "./cards.js";

// Импорт функций для работы с карточками
import { createCard, likeCard, deleteCard } from "./card.js";

// Импорт функций для работы с модальными окнами
import {
  openModal,
  closeModal,
  closeOnClick
} from "./modal.js";

import {
  enableValidation,
  clearValidation
} from "./validation.js"

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const buttonAddCard = document.querySelector(".profile__add-button");
const imageLarge = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

//список попапов (модальных окон)
const modalWindowsList = {
  popupNewCard: document.querySelector(".popup_type_new-card"),
  popupEditProfile: document.querySelector(".popup_type_edit"),
  popupImage: document.querySelector(".popup_type_image")
};

// Элементы форм
const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms.newplace;
const placeName = formNewCard.elements.placename;
const imageLink = formNewCard.elements.link;

// Вывести карточки на страницу
initialCards.forEach(function (element) {
  const currentCard = {
    cardImage: element.link,
    cardTitle: element.name,
  };
  cardsContainer.append(createCard(currentCard, likeCard, deleteCard, openCardImage));
});


// Функция открытия карточки по клику на картинку
function openCardImage(imageSource, titleSource) {
  imageLarge.src = imageSource;
  imageLarge.alt = "фото " + titleSource;
  imagePopupCaption.textContent = titleSource;

  openModal(modalWindowsList.popupImage);
}

//Открытие и автозаполнение формы редактирования страницы
function openPopupEditProfile() {
  openModal(modalWindowsList.popupEditProfile);
  clearValidation(formEditProfile, validationConfig);

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

// Функция-обработчик заполнения формы редактирования страницы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closeModal(modalWindowsList.popupEditProfile);
}

// Открытие формы добавления карточки
function openPopupNewCard() {
  openModal(modalWindowsList.popupNewCard);
  clearValidation(formNewCard, validationConfig);

}

// Функция-обработчик заполнения формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {
    cardImage: imageLink.value,
    cardTitle: placeName.value
  };

  cardsContainer.prepend(createCard(newCard, likeCard, deleteCard, openCardImage));

  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);

  closeModal(modalWindowsList.popupNewCard);
}

buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddCard.addEventListener("click", openPopupNewCard);
formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formNewCard.addEventListener("submit", handleAddCardFormSubmit);

// обработчик закрытия попапов (модальных окон) по клику
Object.values(modalWindowsList).forEach(modalWindow => {
  modalWindow.addEventListener("click", (evt) => closeOnClick(evt, modalWindow));
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

enableValidation(validationConfig);
