import { cardTemplate } from "./index.js";

// Функция создания карточки
function createCard(card, onLike, onDelete, onImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  image.src = card.cardImage;
  image.alt = "фото " + card.cardTitle;

  buttonDelete.addEventListener("click", () => onDelete(buttonDelete));
  buttonLike.addEventListener("click", () => onLike(buttonLike));
  image.addEventListener("click", () =>
    onImage(card.cardImage, card.cardTitle)
  );

  return cardElement;
}

// Функция лайка карточки
function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки
function deleteCard(button) {
  button.closest(".card").remove();
}

export { createCard, likeCard, deleteCard };
