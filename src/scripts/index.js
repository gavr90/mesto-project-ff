import "../pages/index.css";
import { initialCards } from "./cards.js";

// Импорт функций для работы с карточками
import { createCard, likeCard, deleteCard } from "./card.js";

// Импорт функций для работы с модальными окнами
import {
  openModal,
  closeModal,
} from "./modal.js";


// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const imageLarge = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

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

  openModal(popupImage);
}

//Открытие и автозаполнение формы редактирования страницы
function openPopupEditProfile() {
  openModal(popupEditProfile);

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

// Функция-обработчик заполнения формы редактирования страницы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closeModal(popupEditProfile);
}

// Открытие формы добавления карточки
function openPopupNewCard() {
  openModal(popupNewCard);
}

// Функция-обработчик заполнения формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    cardImage: imageLink.value,
    cardTitle: placeName.value,
  };

  cardsContainer.prepend(createCard(newCard, likeCard, deleteCard, openCardImage));

  formNewCard.reset();

  closeModal(popupNewCard);
}

buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddCard.addEventListener("click", openPopupNewCard);
formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formNewCard.addEventListener("submit", handleAddCardFormSubmit);