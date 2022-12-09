//объект с необходимыми значениями классов формы
const validSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//функция показать красную строку, ошибку и текст ошибки
function showInputError(formElement, inputElement, errorMessage) {
  const errorInputElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validSettings.inputErrorClass);
  errorInputElement.classList.add(validSettings.errorClass);
  errorInputElement.textContent = errorMessage;
};

//функция скрыть красную строку, ошибку и текст ошибки
function hideInputError(formElement, inputElement) {
  const errorInputElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validSettings.inputErrorClass);
  errorInputElement.classList.remove(validSettings.errorClass);
  errorInputElement.textContent = '';
};

//функция проверки валидности
function checkInputValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция проверки невалидного поля ввода
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция обработчик полей формы
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
  const submitButton = formElement.querySelector(validSettings.submitButtonSelector);

  toggleButtonStatus(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValid(formElement, inputElement);
      toggleButtonStatus(inputList, submitButton);
    });
  });
};

//функция изменения кнопки отправки формы
function toggleButtonStatus(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(validSettings.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(validSettings.inactiveButtonClass);
  }
};

//функция нахождения и обработки форм
function enableValidation(validSettings) {
  const formList = Array.from(document.querySelectorAll(validSettings.formSelector));

  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
};

enableValidation(validSettings);
