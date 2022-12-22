class FormValidator {
  constructor(validationSettings, formElement) {
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._form = formElement;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  //метод показа ошибки для полей ввода
  _showInputError(inputElement, errorMessage) {
    const errorInputElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorInputElement.classList.add(this._errorClass);
    errorInputElement.textContent = errorMessage;
  }

  //метод скрытия ошибки для полей ввода
  _hideInputError(inputElement) {
    const errorInputElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorInputElement.classList.remove(this._errorClass);
    errorInputElement.textContent = '';
  }

  //метод проверки полей ввода на валидацию
  _checkInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //метод возврата невалидного поля
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //метод переключения статуса активности кнопки отправки
  _toggleButtonStatus() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  //установка слушателей на поля ввода и кнопку отправки
  _setEventListener() {
    this._toggleButtonStatus();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this._toggleButtonStatus();
      });
      this._form.addEventListener('reset', () => {
        setTimeout(() => {
          this._toggleButtonStatus();
        }, 0);
      });
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}

export {FormValidator};
