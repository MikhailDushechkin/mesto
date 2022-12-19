import { openPopUp, overlayPhotoPopUp, overlayPhotoImage, overlayPhotoDescription } from "./index.js";

class Card {
  constructor(data, templateSelector) {
    this.name = data.name;
    this.link = data.link;
    this.template = templateSelector;
  }

  _getCardTemplate() {
    const cardElement = document.querySelector(this.template).content.querySelector('.photo-cards__item').cloneNode(true);

    return cardElement;
  };

  createCard() {
    this._element = this._getCardTemplate();
    const photoCardPhoto = this._element.querySelector('.photo-cards__photo');

    photoCardPhoto.src = this.link;
    this._element.querySelector('.photo-cards__text').textContent = this.name;
    photoCardPhoto.alt = this.name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-cards__button-like').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.photo-cards__button-del').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.photo-cards__photo').addEventListener('click', () => {
      this._openOverlayPopUp();
    });
  }

  _toggleLike() {
    this._element.querySelector('.photo-cards__button-like').classList.toggle('photo-cards__button-like_active');
  }

  _deleteCard() {
    this._element.closest('.photo-cards__item').remove();
  }

  _openOverlayPopUp() {
    overlayPhotoImage.src = this.link;
    overlayPhotoImage.alt = this.name;
    overlayPhotoDescription.textContent = this.name;

    openPopUp(overlayPhotoPopUp);
  }
}

export {Card};
