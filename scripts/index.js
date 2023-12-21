// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardImage, cardTitle) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__title').textContent = cardTitle;
  const button = cardElement.querySelector('.card__delete-button')
  button.addEventListener('click', function () {
    const card = button.closest('.card');
    card.remove();
  });
  return cardElement;
};

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  let cardImage = element.link;
  let cardTitle = element.name;
  placesList.append(addCard(cardImage, cardTitle));
})

