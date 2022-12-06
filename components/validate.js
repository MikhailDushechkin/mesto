const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorInputElement = formElement.querySelector(`.${inputElement.id}__input-error`);

  inputElement.classList.add(validSettings.inputErrorClass);
  errorInputElement.classList.add(validSettings.errorClass);
  errorInputElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement) {
  const errorInputElement = formElement.querySelector(`.${inputElement.id}__input-error`);

  inputElement.classList.remove(validSettings.inputErrorClass);
  errorInputElement.classList.remove(validSettings.errorClass);
  errorInputElement.textContent = '';
};

function checkInputValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValid(formElement, inputElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
};

enableValidation(validSettings);
