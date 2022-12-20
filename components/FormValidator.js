class FormValidator {
  constructor(validationSettings, formElement) {
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorInputElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorInputElement.classList.add(this._errorClass);
    errorInputElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorInputElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorInputElement.classList.remove(this._errorClass);
    errorInputElement.textContent = '';
  }

  _checkInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonStatus(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonStatus(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this._toggleButtonStatus(inputList, submitButton);
      });
      this._form.addEventListener('reset', () => {
        setTimeout(() => {
          this._toggleButtonStatus(inputList, submitButton);
        }, 0);
      });
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}

export {FormValidator};
