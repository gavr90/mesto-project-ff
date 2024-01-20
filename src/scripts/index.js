import "../pages/index.css";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template", ".card").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(card, likeCard, openCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  image.src = card.cardImage;
  image.alt = 'фото ' + card.cardTitle;
  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteCard(buttonDelete));
  cardElement.querySelector(".card__like-button").addEventListener("click", likeCard);
  image.addEventListener("click", openCard);
  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(button) {
  button.closest(".card").remove();
};

// @todo: Вывести карточки на страницу
import {initialCards} from "./cards.js";
initialCards.forEach(function (element) {
  const card = {
    cardImage: element.link,
    cardTitle: element.name 
  };
  placesList.append(addCard(card, like, openCardImage));
});

// @todo: Открытие и закрытие модального окна
const buttonAddProfile = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector(".popup_type_image");


function openModal(modalWindow) {
  modalWindow.classList.add('popup_is-animated');
  setTimeout(() => {
    modalWindow.classList.add('popup_is-opened');
  })
  closeModal(modalWindow);
};

function closeModal(modalWindow) {
  document.addEventListener('keydown', closeByEsc);
  function close(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
  };
  modalWindow.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target | evt.target.className === 'popup__close') {
      close(modalWindow);
    }
  });
  function closeByEsc(evt) {
    if (evt.key === "Escape") {
      close(modalWindow);
    }
  };
};

buttonAddProfile.addEventListener('click', () => openModal(popupNewCard));
buttonEditProfile.addEventListener('click', () => openModal(popupEditCard));

// @todo: функция лайка карточки
function like(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: функция открытия карточки
function openCardImage() {
  const image = document.querySelector(".popup__image")
  const caption = document.querySelector(".popup__caption")
  image.src = '';
  image.alt = '';
  caption.textContent = '';
  openModal(popupImage);
} 

// @todo: форма редактирования страницы
// Находим форму в DOM
const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const name = document.querySelector(".profile__title");// Воспользуйтесь инструментом .querySelector()
const job = document.querySelector(".profile__description");// Воспользуйтесь инструментом .querySelector()
nameInput.value = name.textContent;
jobInput.value = job.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function EditProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupEditCard.classList.remove('popup_is-opened');
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', EditProfileFormSubmit);


// @todo: форма добавления карточки
const formNewCard = document.forms.newplace;
const placeName = formNewCard.elements.placename;
const imageLink = formNewCard.elements.link;

function AddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    cardImage: imageLink.value,
    cardTitle: placeName.value 
  };
  placesList.prepend(addCard(card, like));
  popupNewCard.classList.remove('popup_is-opened');
};

formNewCard.addEventListener('submit', AddCardFormSubmit);

