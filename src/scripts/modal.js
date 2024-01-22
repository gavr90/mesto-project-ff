// Открытие модального окна
function openModal(modalWindow, form) {
  modalWindow.classList.add("popup_is-animated");
  setTimeout(() => {
    modalWindow.classList.add("popup_is-opened");
  });
  modalWindow.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target | evt.target.className === "popup__close") {
      closeModal(modalWindow, form);
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" | "Esc") {
      closeModal(modalWindow, form);
    }
  });
}

// Функция очистки форм
function clearForm(form) {
  if (form) {
    form.reset();
  };
}

// Закрытие модального окна
function closeModal(modalWindow, form) {
  clearForm(form)
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape" | "Esc") {
      closeModal(modalWindow, form);
    }
  });
}

export {openModal, closeModal};

