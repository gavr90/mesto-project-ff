import "../pages/index.css";

// Темплейт карточки
export const cardTemplate = document.querySelector(
  "#card-template",
  ".card"
).content;

// DOM узлы
const placesList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditCard = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");

// Элементы форм
const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms.newplace;
const placeName = formNewCard.elements.placename;
const imageLink = formNewCard.elements.link;

// Вывести карточки на страницу
import { initialCards } from "./cards.js";
initialCards.forEach(function (element) {
  const currentCard = {
    cardImage: element.link,
    cardTitle: element.name,
  };
  placesList.append(addCard(currentCard, like, openCardImage));
});

// Импорт функций для работы с карточками
import { addCard, like } from "./card.js";

// Импорт функций для работы с модальными окнами
import {
  openModal,
  clearForm,
  closeByClick,
  closeByEsc,
  closeModal,
} from "./modal.js";

// Функция открытия карточки по клику на картинку
function openCardImage(imageSource, titleSource) {
  const imageLarge = document.querySelector(".popup__image");
  const caption = document.querySelector(".popup__caption");
  imageLarge.src = imageSource;
  imageLarge.alt = "фото " + titleSource;
  caption.textContent = titleSource;
  openModal(popupImage);
  popupImage.addEventListener("click", closeByClick);
  document.addEventListener("keydown", closeByEsc);
}

//Открытие и автозаполнение формы редактирования страницы
buttonEditProfile.addEventListener("click", () => {
  openModal(popupEditCard, formEditProfile);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupEditCard.addEventListener("click", closeByClick);
  document.addEventListener("keydown", closeByEsc);
});

// Обработка заполнения формы редактирования страницы
function EditProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  clearForm(formEditProfile);
  closeModal(popupEditCard);
  document.removeEventListener("keydown", closeByEsc);
}

formEditProfile.addEventListener("submit", EditProfileFormSubmit);

// Открытие формы добавления карточки
buttonAddCard.addEventListener("click", () => {
  openModal(popupNewCard, formNewCard);
  popupNewCard.addEventListener("click", closeByClick);
  document.addEventListener("keydown", closeByEsc);
});

// Обработка заполнения формы добавления карточки
function addCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    cardImage: imageLink.value,
    cardTitle: placeName.value,
  };
  placesList.prepend(addCard(newCard, like, openCardImage));
  clearForm(formNewCard);
  closeModal(popupNewCard);
  document.removeEventListener("keydown", closeByEsc);
}

formNewCard.addEventListener("submit", addCardFormSubmit);