import "../pages/index.css";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template", ".card").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image")
  image.src = card.cardImage;
  image.alt = 'фото ' + card.cardTitle;
  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteCard(buttonDelete));
  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(buttonDelete) {
  buttonDelete.closest(".card").remove();
};

// @todo: Вывести карточки на страницу
import {initialCards} from "./cards.js";
initialCards.forEach(function (element) {
  const card = {
    cardImage: element.link,
    cardTitle: element.name   
  };
  placesList.append(addCard(card));
});

// @todo: Открытие и закрытие модального окна
const addProfile = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

function openModal (button, modalWindow) {
  button.addEventListener('click', () => modalWindow.classList.add('popup_is-opened'));
  console.log(popupNewCard.classList);
};

openModal(addProfile, popupNewCard);
openModal(editProfile, popupEdit);






