// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(cardImage, cardTitle, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = 'фото ' + cardTitle;
  cardElement.querySelector(".card__title").textContent = cardTitle;
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteCard(buttonDelete));
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(buttonDelete) {
  const card = buttonDelete.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  let cardImage = element.link;
  let cardTitle = element.name;
  placesList.append(addCard(cardImage, cardTitle, deleteCard));
});
