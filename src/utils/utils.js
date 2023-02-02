//id контейнера с разметкой карточек
const templateSelector = '#photo-cards-element';
//класс контейнера с карточками
const cardListSelector = '.photo-cards__list';
//аватар профиля
const avatarProfileSelector = '.profile__avatar';
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
//поп-ап с подтверждением
const popupWithConfirmSelector = '.confirm-popup';

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

export {
  templateSelector,
  cardListSelector,
  avatarProfileSelector,
  profileNameSelector,
  profileDescriptionSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupWithConfirmSelector,
  popupAddCardSelector,
  popupWithImageSelector,
  buttonEditProfile,
  buttonOpenPopUpAddCard,
  inputName,
  inputDescription,
  buttonAvatarProfile,
};
