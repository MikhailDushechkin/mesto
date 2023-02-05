import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);

    this._photoImage = this._popupElement.querySelector('.overlay-photo__image');
    this._photoDescription = this._popupElement.querySelector('.overlay-photo__description');
  }

  open(name, link) {
    this._photoImage.src = link;
    this._photoImage.alt = name;
    this._photoDescription.textContent = name;

    super.open();
  }
}
