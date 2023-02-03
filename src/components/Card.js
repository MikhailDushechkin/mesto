export default class Card {
  constructor(data, {handleCardClick, handleLikeClick, handleDeleteCardClick}, templateSelector, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._template = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._deleteCardClick = handleDeleteCardClick;

    this._api = api;

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

    photoCardPhoto.src = this._link;
    this._element.querySelector('.photo-cards__text').textContent = this._name;
    photoCardPhoto.alt = this._name;

    this._setEventListeners();
    this._checkOwner();
    this._setLikeCount();
    this._leaveActiveLike();

    return this._element;
  }

  _checkOwner() {
    if(this._userId !== this._ownerId) {
      const deleteButton = this._element.querySelector('.photo-cards__button-del')
      deleteButton.style.display = 'none'
    }
  }

  _setLikeCount() {
    if(this._likes.length > 0) {
      this._element.querySelector('.photo-cards__like-counter').textContent = this._likes.length;
      this._element.querySelector('.photo-cards__description').style.padding = '20.5px 20px 26.5px 21px'
    }
  }

  _leaveActiveLike() {
    if(this._likes.find((data) => this._userId === data._id)) {
      this._element.querySelector('.photo-cards__button-like').classList.add('photo-cards__button-like_active')
    }
  }

  //установка слушателей
  _setEventListeners() {
    //слушатель для лайка
    this._element.querySelector('.photo-cards__button-like').addEventListener('click', () => {
      this._handleLikeClick();
      this._element.querySelector('.photo-cards__description').style.padding = '20.5px 20px 26.5px 21px'
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

  //метод переключения лайка
  toggleLike() {
    const likeButton = this._element.querySelector('.photo-cards__button-like')
    const likeCount = this._element.querySelector('.photo-cards__like-counter')

    if(!(likeButton.classList.contains('photo-cards__button-like_active'))) {
      this._api.setLike(this._id)
      .then((data) => {
        likeButton.classList.add('photo-cards__button-like_active')
        likeCount.textContent = data.likes.length
      })
      .catch((err) => console.log(err))
    } else {
      this._api.deleteLike(this._id)
      .then((data) => {
        likeButton.classList.remove('photo-cards__button-like_active')
        likeCount.textContent = data.likes.length
      })
      .catch((err) => console.log(err))
    }
  }

  //метод удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
