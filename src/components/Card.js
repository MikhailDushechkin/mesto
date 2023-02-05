export default class Card {
  constructor(data, {handleCardClick, handleLikeClick, handleDeleteCardClick}, templateSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._template = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._deleteCardClick = handleDeleteCardClick;

    this._userId = userId;
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
    this._likeB = this._element.querySelector('.photo-cards__button-like')
    this._likeC = this._element.querySelector('.photo-cards__like-counter')

    photoCardPhoto.src = this._link;
    this._element.querySelector('.photo-cards__text').textContent = this._name;
    photoCardPhoto.alt = this._name;

    this._setEventListeners();
    this._checkOwner();
    this._setLikeCount();
    this._leaveActiveLike();

    return this._element;
  }

  //проверка кому принадлежит карточка
  _checkOwner() {
    if(this._userId !== this._ownerId) {
      const deleteButton = this._element.querySelector('.photo-cards__button-del')
      deleteButton.style.display = 'none'
    }
  }

  //счетчик лайков
  _setLikeCount() {
    if(this._likes.length > 0) {
      this._likeC.textContent = this._likes.length;
      this._element.querySelector('.photo-cards__description').classList.add('photo-cards__description_with-count')
    }
  }

  //активный лайк
  _leaveActiveLike() {
    if(this._likes.find((data) => this._userId === data._id)) {
      this._likeB.classList.add('photo-cards__button-like_active')
    }
  }

  //установка слушателей
  _setEventListeners() {
    //слушатель для лайка
    this._element.querySelector('.photo-cards__button-like').addEventListener('click', () => {
      this._handleLikeClick();
      this._element.querySelector('.photo-cards__description').classList.add('photo-cards__description_with-count')
    });
    //слушатель для удаления карточки
    this._element.querySelector('.photo-cards__button-del').addEventListener('click', () => {
      this._deleteCardClick();
    });
    //слушатель для открытия фото
    this._element.querySelector('.photo-cards__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //проверка активного лайка
  checkLike() {
    return this._likeB.classList.contains('photo-cards__button-like_active')
  }

  //поставить лайк, изменить счетчик
  addLike(data) {
    this._likeB.classList.add('photo-cards__button-like_active')
    this._likeC.textContent = data.likes.length
  }

  //убрать лайк, изменить счетчик
  removeLike(data) {
    this._likeB.classList.remove('photo-cards__button-like_active')
    this._likeC.textContent = data.likes.length
  }

  //метод удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
