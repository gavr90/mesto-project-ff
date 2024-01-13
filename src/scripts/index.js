import "../pages/index.css";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template", ".card").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector('.card__image')
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
