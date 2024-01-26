// Открытие модального окна
function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-animated");
  setTimeout(() => {
    modalWindow.classList.add("popup_is-opened");
  });

  document.addEventListener("keydown", closeWithEsc);
}

// Функция закрытия модального окна
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
}

// Функция-обработчик закрытия по оверлею и кнопке "закрыть"
function closeOnClick(evt, modalWindow) {
  if (
    (evt.currentTarget === evt.target) ||
    (evt.target.classList.contains("popup__close"))
  ) {
    closeModal(modalWindow);
  }
}

// Функция-обработчик закрытия по кнопке Esc
function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector('.popup_is-opened');
    closeModal(activeModal);
  }
}

export { openModal, closeModal, closeOnClick };
