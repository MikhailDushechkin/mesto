//объект с необходимыми значениеми классов формы
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
  const errorInputElement = formElement.querySelector(`.${inputElement.id}__input-error`);

  inputElement.classList.add(validSettings.inputErrorClass);
  errorInputElement.classList.add(validSettings.errorClass);
  errorInputElement.textContent = errorMessage;
};

//функция скрыть красную строку, ошибку и текст ошибки
function hideInputError(formElement, inputElement) {
  const errorInputElement = formElement.querySelector(`.${inputElement.id}__input-error`);

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
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
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
    submitButton.classList.add(validSettings.inactiveButtonClass);
  } else {
    submitButton.classList.remove(validSettings.inactiveButtonClass);
  }
};

//функция нахождения и обработки форм
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
};

enableValidation(validSettings);
