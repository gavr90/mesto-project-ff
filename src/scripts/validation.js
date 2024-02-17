const regex = /[^а-яa-z\-\sё]/gi;

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  const buttonList = Array.from(document.querySelectorAll(config.submitButtonSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });

  buttonList.forEach((buttonElement) => {
    buttonElement.setAttribute("disabled", "disabled");
  });
}

function clearValidation(formElement, config) {
  const inputElementList = formElement.querySelectorAll(config.inputSelector);
  const errorElementList = formElement.querySelectorAll("." + config.errorClass);
  inputElementList.forEach((inputElement) => {
    if (inputElement.classList.contains(config.inputErrorClass)) {
      inputElement.classList.remove(config.inputErrorClass);
    }
  });
  errorElementList.forEach((errorElement) => {
    if (errorElement.classList.contains(config.errorClassVisible)) {
      errorElement.classList.remove(config.errorClassVisible);
    }
  });
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClassVisible);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClassVisible);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.type === "text") {
    if (inputElement.value.match(regex)) {
      inputElement.setCustomValidity(inputElement.dataset.errorSintaxMessage);
      inputElement.classList.add(config.inputErrorClass);
    } else {
      inputElement.setCustomValidity("");
      inputElement.classList.remove(config.inputErrorClass);
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
  }
}

export { enableValidation, clearValidation };
