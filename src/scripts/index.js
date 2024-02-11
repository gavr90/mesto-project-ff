import "../pages/index.css";

// Импорт функций api
import { 
  getProfileData,
  editAvatar,
  editProfileData,
  getInitialCards,
  addCard,
} from "./api.js";

// Импорт функций для работы с карточками
import { 
  createCard, 
  likeCard, 
  deleteCard 
} from "./card.js";

// Импорт функций для работы с модальными окнами
import {
  openModal,
  closeModal,
  closeOnClick,
  renderLoading
} from "./modal.js";

import {
  enableValidation,
  clearValidation
} from "./validation.js";

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const avatar = document.querySelector(".profile__image");
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const buttonAddCard = document.querySelector(".profile__add-button");
const imageLarge = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

//список попапов (модальных окон)
const modalWindowsList = {
  popupNewCard: document.querySelector(".popup_type_new-card"),
  popupEditAvatar: document.querySelector(".popup_type_edit-avatar"),
  popupEditProfile: document.querySelector(".popup_type_edit"),
  popupImage: document.querySelector(".popup_type_image")
};

// Элементы форм
const formEditAvatar = document.forms.editavatar;
const avatarLink = formEditAvatar.elements.link;
const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms.newplace;
const placeName = formNewCard.elements.placename;
const imageLink = formNewCard.elements.link;

// Настройки валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Информация с сервера
let myId;
let cardIds = [];

// Функция открытия карточки по клику на картинку
function openCardImage(imageSource, titleSource) {
  imageLarge.src = imageSource;
  imageLarge.alt = "фото " + titleSource;
  imagePopupCaption.textContent = titleSource;

  openModal(modalWindowsList.popupImage);
}

// Открытие формы изменения аватара
function openPopupEditAvatar() {
  openModal(modalWindowsList.popupEditAvatar);
  clearValidation(formEditAvatar, validationConfig);
}

// Функция-обработчик заполнения формы изменения аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  // Вызов функции изменения аватара
  editAvatar(avatarLink.value)
    .then((result) => {
      avatar.setAttribute("style", `background-image: url(${result.avatar})`);

      formEditAvatar.reset();
      clearValidation(formEditAvatar, validationConfig);
     
      closeModal(modalWindowsList.popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        renderLoading(false, evt);
    })
}

// Открытие и автозаполнение формы редактирования страницы
function openPopupEditProfile() {
  openModal(modalWindowsList.popupEditProfile);
  clearValidation(formEditProfile, validationConfig);

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

// Функция-обработчик заполнения формы редактирования страницы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  
  // Вызов функции редактирования страницы
  editProfileData(nameInput.value, jobInput.value)
    .then((result) => {
      name.textContent = result.name;
      job.textContent = result.about;
     
      closeModal(modalWindowsList.popupEditProfile);
    })
    .catch((err) => {
        console.log(err); 
    })
    .finally(() => {
      renderLoading(false, evt);
  })
}

// Открытие формы добавления карточки
function openPopupNewCard() {
  openModal(modalWindowsList.popupNewCard);
  clearValidation(formNewCard, validationConfig);
}

// Функция-обработчик заполнения формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  // Вызов функции добавления новой карточки
  addCard(placeName.value, imageLink.value)
    .then((result) => {
      result.forEach((element) => {
        const newCard = {
          cardImage: element.link,
          cardTitle: element.name,
        };
      });
      cardsContainer.prepend(createCard(newCard, likeCard, deleteCard, openCardImage, true, element._id));

      formNewCard.reset();
      clearValidation(formNewCard, validationConfig);

      closeModal(modalWindowsList.popupNewCard);
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(false, evt);
    })
}

// Вызов функции получения информации о профиле
getProfileData()
  .then((result) => {
    name.textContent = result.name;
    job.textContent = result.about;
    avatar.setAttribute('style', `background-image: url(${result.avatar})`);
    myId = result._id;
  })
  
  .catch((err) => {
    console.log(err); 
  }); 

// Вызов функции получения карточек с сервера
getInitialCards()
  .then((result) => {
    result.forEach((element) => {
      const currentCard = {
        cardImage: element.link,
        cardTitle: element.name,
        likeNumber: element.likes.length
      };
      if(element.owner._id !== myId){
        cardsContainer.append(createCard(currentCard, likeCard, deleteCard, openCardImage, false, element._id));
      }else{
        cardsContainer.append(createCard(currentCard, likeCard, deleteCard, openCardImage, true, element._id));
      };
      cardIds.push(element._id);
    });
    console.log(cardIds);
  })
  .catch((err) => {
    console.log(err); 
  }); 

// Слушатели событий
avatar.addEventListener("click", openPopupEditAvatar);
buttonEditProfile.addEventListener("click", openPopupEditProfile);
buttonAddCard.addEventListener("click", openPopupNewCard);
formEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);
formEditProfile.addEventListener("submit", handleEditProfileFormSubmit);
formNewCard.addEventListener("submit", handleAddCardFormSubmit);

// Обработчик закрытия попапов (модальных окон) по клику
Object.values(modalWindowsList).forEach(modalWindow => {
  modalWindow.addEventListener("click", (evt) => closeOnClick(evt, modalWindow));
});

// Вызов функции валидации
enableValidation(validationConfig);


