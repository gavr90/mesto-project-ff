import "../pages/index.css";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template", ".card").content;

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function addCard(card, likeCard, openCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  image.src = card.cardImage;
  image.alt = 'фото ' + card.cardTitle;
  cardElement.querySelector(".card__title").textContent = card.cardTitle;
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => deleteCard(buttonDelete));
  const buttonLike = cardElement.querySelector(".card__like-button")
  buttonLike.addEventListener("click", () => likeCard(buttonLike));
  image.addEventListener("click", () => openCard(card.cardImage, card.cardTitle));
  return cardElement;
} 

// функция открытия карточки по клику на картинку
function openCardImage(imageSource, titleSource) {
  const imageBig = document.querySelector(".popup__image");
  const caption = document.querySelector(".popup__caption");
  imageBig.src = imageSource; 
  imageBig.alt = 'фото ' + titleSource; 
  caption.textContent = titleSource;
  openModal(popupImage);
}

// Функция удаления карточки
function deleteCard(button) {
  button.closest(".card").remove();
}

// Вывести карточки на страницу
import {initialCards} from "./cards.js";
initialCards.forEach(function (element) {
  const currentCard = {
    cardImage: element.link,
    cardTitle: element.name 
  };
  placesList.append(addCard(currentCard, like, openCardImage));
});

// Открытие модального окна
const buttonAddProfile = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditCard = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector(".popup_type_image");

function openModal(modalWindow, form) {
  modalWindow.classList.add('popup_is-animated');
  setTimeout(() => {
    modalWindow.classList.add('popup_is-opened');
  });
  modalWindow.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target | evt.target.className === 'popup__close') {
      if (form) {
        form.reset();
      };
      closeModal(modalWindow);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" | "Esc") {
      if (form) {
        form.reset();
      };
      closeModal(modalWindow);
    }
  });
}

// Закрытие модального окна
function closeModal(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => {
    if (evt.key === "Escape" | "Esc") {
      closeModal(modalWindow);
    }
  });
}

// Функция лайка карточки
function like(button) {
  button.classList.toggle('card__like-button_is-active');
};

// Форма редактирования страницы
const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");

//Открытие и автозаполнение формы редактирования страницы
buttonEditProfile.addEventListener('click', () => {
  openModal(popupEditCard, formEditProfile);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

// Функция заполнения формы редактирования страницы
function EditProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(popupEditCard);
}

formEditProfile.addEventListener('submit', EditProfileFormSubmit);

// Форма добавления карточки
const formNewCard = document.forms.newplace;
const placeName = formNewCard.elements.placename;
const imageLink = formNewCard.elements.link;

// Открытие формы добавления карточки
buttonAddProfile.addEventListener('click', () => openModal(popupNewCard, formNewCard));

// Функция заполнения формы добавления карточки
function AddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    cardImage: imageLink.value,
    cardTitle: placeName.value 
  };
  placesList.prepend(addCard(newCard, like, openCardImage));
  closeModal(popupNewCard);
}

formNewCard.addEventListener('submit', AddCardFormSubmit);