import {cardTemplate} from "../index.js";

// Функция создания карточки
function addCard(card, likeCard, openCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  image.src = card.cardImage;
  image.alt = "фото " + card.cardTitle;
  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteCard(buttonDelete));
  const buttonLike = cardElement.querySelector(".card__like-button")
  buttonLike.addEventListener("click", () => likeCard(buttonLike));
  image.addEventListener("click", () => openCard(card.cardImage, card.cardTitle));
  return cardElement;
} 

// Функция лайка карточки
function like(button) {
  button.classList.toggle("card__like-button_is-active");
};

// Функция удаления карточки
function deleteCard(button) {
  button.closest(".card").remove();
}

export {addCard, like, deleteCard};
