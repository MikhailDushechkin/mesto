import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup{
  constructor(popupSelector) {
    super(popupSelector);

    this._popupButton = document.querySelector('.confirm-popup__button')
  }

  confirm(callback) {
    this._handleConfirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    })
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Удаление...'
    } else {
      this._popupButton.textContent = 'Да'
    }
  }
}
