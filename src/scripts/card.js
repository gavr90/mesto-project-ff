import { cardTemplate } from "./index.js";
import { 
  addLikeApi,
  removeLikeApi, 
  deleteCardApi 
} from "./api.js";

// Функция создания карточки
function createCard(card, onLike, onDelete, onImageClick, isMine, cardId) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter")

  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  image.src = card.cardImage;
  image.alt = "фото " + card.cardTitle;
  likeCounter.textContent = card.likeNumber;
  if (isMine) {
    buttonDelete.addEventListener("click", () => onDelete(cardId));
  }else{
    buttonDelete.setAttribute("style", "display: none");
  }
  buttonLike.addEventListener("click", () => onLike(buttonLike, cardId));
  image.addEventListener("click", () =>
    onImageClick(card.cardImage, card.cardTitle)
  );

  return cardElement;
}

// Функция лайка карточки
function likeCard(button, id) {
  if(button.classList.contains("card__like-button_is-active")) {  
    removeLikeApi(id)
      .then((result) => {
        console.log(result);
        console.log(button.closest(".card"));
      })
      .catch((err) => {
        console.log(err); 
      })
  }else{
    addLikeApi(id)
      .then((result) => {
        console.log(result);
        console.log(button.closest(".card"));
      })
      .catch((err) => {
        console.log(err); 
      })
  }
  button.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки
function deleteCard(button, id) {
  deleteCardApi(id)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err); 
    })
//  button.closest(".card").remove();
}

export { createCard, likeCard, deleteCard };
