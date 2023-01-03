import { initialCards, validSettings } from "./initialData.js";
import { Card } from "./Card.js";
import Popup from "./Popup.js";
import { FormValidator } from "./FormValidator.js";


// const page = document.querySelector('.page');

const profile = document.querySelector('.profile');
//кнопка редактирования профиля
const buttonEditProfile = profile.querySelector('.profile__edit-button');
//кнопка добавления фотографий
const buttonOpenPopUpAddCard = profile.querySelector('.profile__add-button');
//блок с имененем профиля
const profileName = profile.querySelector('.profile__name');
//блок с описанием профиля
const profileDescription = profile.querySelector('.profile__description');

// const popupList = document.querySelectorAll('.popup');

//поп-ап редактирования профиля
const popUpEditProfile = document.querySelector('.edit-popup');

//поп-ап добавления фотографий
const popUpAddCard = document.querySelector('.add-popup');

//форма редактирования профиля
const formEditProfile = document.querySelector('.edit-form');

//инпут для ввода имени профиля в форме
const inputName = formEditProfile.querySelector('#profile-name');
//инпут для ввода описания профиля в форме
const inputDescription = formEditProfile.querySelector('#profile-description');
//инпут для ввода названия фотографии
const inputPhotoName = popUpAddCard.querySelector('#photo-name');
//инпут для ввода ссылки фотографии
const inputPhotoLink = popUpAddCard.querySelector('#photo-link');

//список с фото карточками
const photoCardsList = document.querySelector('.photo-cards__list');

//поп-ап с фото
const popUpOverlayPhoto = document.querySelector('.overlay-photo');
const overlayPhotoImage = popUpOverlayPhoto.querySelector('.overlay-photo__image');
const overlayPhotoDescription = popUpOverlayPhoto.querySelector('.overlay-photo__description');

const popUpProfileEdit = new Popup('.edit-popup');

function createNewCard(data, templateSelector) {
  const initCard = new Card(data, templateSelector);

  return initCard.createCard();
};

//функция инициализации карточек из "заготовки"
function renderInitialPhotoCards(item) {
  item.forEach(element => {
    pastePhotoCard(createNewCard(element, '#photo-cards-element'));
  });
};
renderInitialPhotoCards(initialCards);

//функция вставки карточек в начало узла списка
function pastePhotoCard(item) {
  photoCardsList.prepend(item);
};

//функция открытие поп-апов
// function openPopUp(popup) {
//   popup.classList.add('popup_opened');
//   setListenerOnEsc(closePopUpWithEsc);
// };
// //функция закрытие поп-апов
// function closePopUp(popup) {
//   popup.classList.remove('popup_opened');
//   removeListenerOnEsc(closePopUpWithEsc);
// };

//функция закрытия поп-ап через кнопки или оверлей
// function closePopUpWithButtonOrOverlay() {
//   popupList.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) {
//         closePopUp(popup)
//       }
//       if (evt.target.classList.contains('popup__close-button')) {
//         closePopUp(popup)
//       }
//     });
//   });
// };

// closePopUpWithButtonOrOverlay();

//функция закрытия поп-ап через Esc
// function closePopUpWithEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popupOpened = page.querySelector('.popup_opened');
//     closePopUp(popupOpened);
//   }
// };

//функция установки слушателя для Esc
// function setListenerOnEsc(item) {
//   page.addEventListener('keydown', item);
// };
// //функция удаления слушателя для Esc
// function removeListenerOnEsc(item) {
//   page.removeEventListener('keydown', item);
// };

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

//функция добавления фотографий через поп-ап пользователем
function addPhotoByUser(evt) {
  evt.preventDefault();

  const photoByUser = { name: inputPhotoName.value, link: inputPhotoLink.value };

  pastePhotoCard(createNewCard(photoByUser, '#photo-cards-element'));

  closePopUp(popUpAddCard);
  evt.target.reset();
};

buttonEditProfile.addEventListener('click', openPopUpEditInfo);
formEditProfile.addEventListener('submit', saveProfileEditForm);

buttonOpenPopUpAddCard.addEventListener('click', () => openPopUp(popUpAddCard));
popUpAddCard.addEventListener('submit', addPhotoByUser);

const addPhotoForm = new FormValidator(validSettings, popUpAddCard);
addPhotoForm.enableValidation();

const editProfileForm = new FormValidator(validSettings, popUpEditProfile);
editProfileForm.enableValidation();


buttonEditProfile.addEventListener('click', () => popUpProfileEdit.open());
popUpProfileEdit.setEventListeners();

export {
  // openPopUp,
  popUpOverlayPhoto,
  overlayPhotoImage,
  overlayPhotoDescription,
  validSettings,
}
