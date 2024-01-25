// Открытие модального окна
function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  setTimeout(() => {
    modalWindow.classList.add("popup_is-opened");
  });

  modalWindow.addEventListener("click", (evt) => closeByClick(evt, modalWindow));
  document.addEventListener("keydown", closeByEsc);
}

// Функция закрытия модального окна
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

// Функция-обработчик закрытия по оверлею и кнопке "закрыть"
function closeByClick(evt, modalWindow) {
  if (
    (evt.currentTarget === evt.target) ||
    (evt.target.classList.contains("popup__close"))
  ) {
    closeModal(modalWindow);
  }
}

// Функция-обработчик закрытия по кнопке Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector('.popup_is-opened');
    closeModal(activeModal);
  }
}

export { openModal, closeModal };
