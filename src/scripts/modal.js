// Открытие модального окна
function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  setTimeout(() => {
    modalWindow.classList.add("popup_is-opened");
  });
}

// Функция очистки форм
function clearForm(form) {
  if (form) {
    form.reset();
  }
}

// Функция закрытия модального окна
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
}

// Функция-обработчик закрытия по оверлею и кнопке "закрыть"
function closeByClick(evt) {
  if (
    (evt.currentTarget === evt.target) |
    (evt.target.className === "popup__close")
  ) {
    const activeModal = document.querySelector('.popup_is-opened');
    closeModal(activeModal);
    const form = activeModal.querySelector('.popup__form');
    clearForm(form);
    document.removeEventListener("keydown", closeByEsc);
  }
}

// Функция-обработчик закрытия по кнопке Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector('.popup_is-opened');
    closeModal(activeModal);
    const form = activeModal.querySelector('.popup__form');
    clearForm(form);
    document.removeEventListener("keydown", closeByEsc);
  }
  console.log('Я возникаю, когда печатают в текстовом поле.')
}

export { openModal, clearForm, closeByClick, closeByEsc, closeModal };
