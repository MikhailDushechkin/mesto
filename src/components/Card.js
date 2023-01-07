export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //получение и возврат готовой разметки
  _getCardTemplate() {
    const cardElement = document.querySelector(this._template).content.querySelector('.photo-cards__item').cloneNode(true);

    return cardElement;
  };

  //создание карточки, присвоение свойств, возврат готовой карточки
  createCard() {
    this._element = this._getCardTemplate();
    const photoCardPhoto = this._element.querySelector('.photo-cards__photo');

    photoCardPhoto.src = this._link;
    this._element.querySelector('.photo-cards__text').textContent = this._name;
    photoCardPhoto.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  //установка слушателей
  _setEventListeners() {
    //слушатель для лайка
    this._element.querySelector('.photo-cards__button-like').addEventListener('click', () => {
      this._toggleLike();
    });
    //слушатель для удаления карточки
    this._element.querySelector('.photo-cards__button-del').addEventListener('click', () => {
      this._deleteCard();
    });
    //слушатель для открытия фото
    this._element.querySelector('.photo-cards__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //метод переключения лайка
  _toggleLike() {
    this._element.querySelector('.photo-cards__button-like').classList.toggle('photo-cards__button-like_active');
  }

  //метод удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
