import { initialCards, validSettings } from "./initialData.js";
import Section from "./Section.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";

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

//данные пользователя
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);

//функция создания новых карточек
function createNewCard(data, templateSelector) {
  const initCard = new Card({
    data,
    handleCardClick: () => {
      popUpWithOverlay.open(data.name, data.link);
    }}, templateSelector);

  return initCard.createCard();
};

//отрисовка элементов на странице
const cardRender = new Section({
  data: initialCards,
  renderer: (item) => {
    cardRender.addItem(createNewCard(item, templateSelector))
  }
}, cardListSelector)
cardRender.renderItems();

//создание экземпляров валидации форм
const addPhotoForm = new FormValidator(validSettings, popupAddCardSelector);
addPhotoForm.enableValidation();

const editProfileForm = new FormValidator(validSettings, popupEditProfileSelector);
editProfileForm.enableValidation();

//поп-ап с фото
const popUpWithOverlay = new PopupWithImage(popupWithImageSelector);

//поп-ап добавление карточек
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  submitForm: (item) => {
    cardRender.addItem(createNewCard(item, templateSelector));
  }
})

const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  submitForm: (item) => {
    userInfo.setUserInfo(item);
  }
})

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();

  const {name, description} = userInfo.getUserInfo();
  inputName.focus();
  inputName.value = name;
  inputDescription.value = description;

});

buttonOpenPopUpAddCard.addEventListener('click', () => popupAddCard.open());

