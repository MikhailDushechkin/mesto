import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);

    this._submitForm = submitForm;
    this._form = this._popupElement.querySelector('.form');
    this._popupButton = this._popupElement.querySelector('.form__save-button')
    this._inputList = this._popupElement.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._values = {};

    this._inputList.forEach(element => {
      this._values[element.name] = element.value;
    });

    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = 'Сохранить'
    }
  }

  close() {
    this._form.reset();
    super.close();
  }
}
