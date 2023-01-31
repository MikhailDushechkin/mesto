const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//id контейнера с разметкой карточек
const templateSelector = '#photo-cards-element';
//класс контейнера с карточками
const cardListSelector = '.photo-cards__list';
//блок с имененем профиля
const profileNameSelector = '.profile__name';
//блок с описанием профиля
const profileDescriptionSelector = '.profile__description';
//поп-ап редактирования профиля
const popupEditProfileSelector = '.edit-popup';
//поп-ап редактирования аватара
const popupEditAvatarSelector = '.edit-avatar-popup'
//поп-ап добавления фотографий
const popupAddCardSelector = '.add-popup';
//поп-ап с фото
const popupWithImageSelector = '.overlay-photo';

const profile = document.querySelector('.profile');
//кнопка редактирования профиля
const buttonEditProfile = profile.querySelector('.profile__edit-button');
//кнопка добавления фотографий
const buttonOpenPopUpAddCard = profile.querySelector('.profile__add-button');
//инпут для ввода имени профиля в форме
const inputName = document.querySelector('#profile-name');
//инпут для ввода описания профиля в форме
const inputDescription = document.querySelector('#profile-description');
//кнопка изменения аватара профиля
const buttonAvatarProfile = document.querySelector('.profile__avatar-wrapper');
//аватар профиля
const avatarProfileSelector = '.profile__avatar';

export {
  initialCards,
  templateSelector,
  cardListSelector,
  profileNameSelector,
  profileDescriptionSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupWithImageSelector,
  buttonEditProfile,
  buttonOpenPopUpAddCard,
  inputName,
  inputDescription,
  buttonAvatarProfile,
  avatarProfileSelector
};
