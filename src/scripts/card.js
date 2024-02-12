import { cardTemplate } from "./index.js";
import { addLikeApi, removeLikeApi, deleteCardApi } from "./api.js";

// Функция создания карточки
function createCard(card, onLike, onDelete, onImageClick, profileData) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  image.src = card.cardImage;
  image.alt = "фото " + card.cardTitle;
  likeCounter.textContent = card.likes.length;
  // проверка, ставился ли лайк
  if (
    (card.likes.find((item) => item._id == profileData.myId) && true) ||
    false
  ) {
    buttonLike.classList.add("card__like-button_is-active");
  }
  // проверка, моя ли карточка
  if (card.userId === profileData.myId) {
    buttonDelete.addEventListener("click", () =>
      onDelete(buttonDelete, card.cardId)
    );
  } else {
    buttonDelete.setAttribute("style", "display: none");
  }
  buttonLike.addEventListener("click", () =>
    onLike(buttonLike, likeCounter, card.cardId)
  );
  image.addEventListener("click", () =>
    onImageClick(card.cardImage, card.cardTitle)
  );

  return cardElement;
}

// Функция лайка карточки
function likeCard(button, counter, id) {
  if (button.classList.contains("card__like-button_is-active")) {
    removeLikeApi(id)
      .then((result) => {
        counter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeApi(id)
      .then((result) => {
        counter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  button.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки
function deleteCard(button, id) {
  deleteCardApi(id)
    .then(() => {
      button.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, likeCard, deleteCard };
