import { initialCards, validSettings } from "./initialData.js";
import Section from "./Section.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";

const profile = document.querySelector('.profile');
//кнопка редактирования профиля
const buttonEditProfile = profile.querySelector('.profile__edit-button');
//кнопка добавления фотографий
const buttonOpenPopUpAddCard = profile.querySelector('.profile__add-button');
//блок с имененем профиля
const profileName = profile.querySelector('.profile__name');
//блок с описанием профиля
const profileDescription = profile.querySelector('.profile__description');

//поп-ап редактирования профиля
const popUpEditProfile = document.querySelector('.edit-popup');

//поп-ап добавления фотографий
const popUpAddPhotoCard = document.querySelector('.add-popup');

//форма редактирования профиля
const formEditProfile = document.querySelector('.edit-form');

//инпут для ввода имени профиля в форме
const inputName = formEditProfile.querySelector('#profile-name');
//инпут для ввода описания профиля в форме
const inputDescription = formEditProfile.querySelector('#profile-description');

//создание экземпляров поп-ап
const popUpProfileEdit = new Popup('.edit-popup');
const popUpWithOverlay = new PopupWithImage('.overlay-photo');

//поп-ап добавление карточек
const popupAddCard = new PopupWithForm({
  popupSelector: '.add-popup',
  submitForm: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popUpWithOverlay.open(item.name, item.link);
      }
    }, '#photo-cards-element')

    const cardElement = card.createCard();

    cardRender.addItem(cardElement);
  }
})

//создание экземпляров форм
const addPhotoForm = new FormValidator(validSettings, popUpAddPhotoCard);
addPhotoForm.enableValidation();

const editProfileForm = new FormValidator(validSettings, popUpEditProfile);
editProfileForm.enableValidation();

//отрисовка элементов на странице
const cardRender = new Section({
  data: initialCards,
  renderer: (item) => {
    cardRender.addItem(createNewCard(item, '#photo-cards-element'))
  }
}, '.photo-cards__list')
cardRender.renderItems();

//функция создания новых карточек
function createNewCard(data, templateSelector) {
  const initCard = new Card({
    data,
    handleCardClick: () => {
      popUpWithOverlay.open(data.name, data.link);
    }}, templateSelector);

  return initCard.createCard();
};

//функция открытия поп-ап редактирования профиля
function openPopUpEditInfo() {
  popUpProfileEdit.open();

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  inputName.focus();
};

//функция сохранения введенных данных пользователем в форме редактирования профиля
function saveProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopUp(popUpEditProfile);
};

buttonEditProfile.addEventListener('click', openPopUpEditInfo);
formEditProfile.addEventListener('submit', saveProfileEditForm);

buttonOpenPopUpAddCard.addEventListener('click', () => popupAddCard.open());

buttonEditProfile.addEventListener('click', () => popUpProfileEdit.open());
// popUpProfileEdit.setEventListeners();
