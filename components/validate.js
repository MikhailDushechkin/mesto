// //функция показать красную строку, ошибку и текст ошибки
// function showInputError(formElement, inputElement, errorMessage, validSettings) {
//   const errorInputElement = formElement.querySelector(`.${inputElement.id}-error`);

//   inputElement.classList.add(validSettings.inputErrorClass);
//   errorInputElement.classList.add(validSettings.errorClass);
//   errorInputElement.textContent = errorMessage;
// };

// //функция скрыть красную строку, ошибку и текст ошибки
// function hideInputError(formElement, inputElement, validSettings) {
//   const errorInputElement = formElement.querySelector(`.${inputElement.id}-error`);

//   inputElement.classList.remove(validSettings.inputErrorClass);
//   errorInputElement.classList.remove(validSettings.errorClass);
//   errorInputElement.textContent = '';
// };

// //функция проверки валидности
// function checkInputValid(formElement, inputElement, validSettings) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, validSettings);
//   } else {
//     hideInputError(formElement, inputElement, validSettings);
//   }
// };

// //функция проверки невалидного поля ввода
// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //функция изменения кнопки отправки формы
// function toggleButtonStatus(inputList, submitButton, validSettings) {
//   if (hasInvalidInput(inputList)) {
//     submitButton.disabled = true;
//     submitButton.classList.add(validSettings.inactiveButtonClass);
//   } else {
//     submitButton.disabled = false;
//     submitButton.classList.remove(validSettings.inactiveButtonClass);
//   }
// };

// //функция обработчик полей формы
// function setEventListener(formElement, validSettings) {
//   const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
//   const submitButton = formElement.querySelector(validSettings.submitButtonSelector);

//   toggleButtonStatus(inputList, submitButton, validSettings);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValid(formElement, inputElement, validSettings);
//       toggleButtonStatus(inputList, submitButton, validSettings);
//     });
//     formElement.addEventListener('reset', () => {
//       setTimeout(() => {
//         toggleButtonStatus(inputList, submitButton, validSettings);
//       }, 0);
//     });
//   });
// };

// //функция нахождения и обработки форм
// function enableValidation(validSettings) {
//   const formList = Array.from(document.querySelectorAll(validSettings.formSelector));

//   formList.forEach((formElement) => {
//     setEventListener(formElement, validSettings);
//   });
// };

// enableValidation(validSettings);
