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

const page = document.querySelector('.page');

//шаблон карточки с фото
const addPhotoTemplate = document.querySelector('#photo-cards-element').content;

const profile = document.querySelector('.profile');
//кнопка редактирования профиля
const profileEditButton = profile.querySelector('.profile__edit-button');
//кнопка добавления фотографий
const addPhotoButton = profile.querySelector('.profile__add-button');
//блок с имененем профиля
const profileName = profile.querySelector('.profile__name');
//блок с описанием профиля
const profileDescription = profile.querySelector('.profile__description');

const popupList = document.querySelectorAll('.popup');

//поп-ап редактирования профиля
const profileEditPopUp = document.querySelector('.edit-popup');

//поп-ап добавления фотографий
const addPhotoPopUp = document.querySelector('.add-popup');

//форма редактирования профиля
const profileEditForm = document.querySelector('.edit-form');
//форма добавления фотографий
const addPhotoForm = document.querySelector('.add-cards-form');
//инпут для ввода имени профиля в форме
const inputName = profileEditForm.querySelector('#profile-name');
//инпут для ввода описания профиля в форме
const inputDescription = profileEditForm.querySelector('#profile-description');
//инпут для ввода названия фотографии
const inputPhotoName = addPhotoPopUp.querySelector('#photo-name');
//инпут для ввода ссылки фотографии
const inputPhotoLink = addPhotoPopUp.querySelector('#photo-link');

//список с фото карточками
const photoCardsList = document.querySelector('.photo-cards__list');

//поп-ап с фото
const overlayPhotoPopUp = document.querySelector('.overlay-photo');
const overlayPhotoImage = overlayPhotoPopUp.querySelector('.overlay-photo__image');
const overlayPhotoDescription = overlayPhotoPopUp.querySelector('.overlay-photo__description');

//функция инициализации карточек из "заготовки"
function renderInitialPhotoCards(item) {
  item.forEach(element => {
    pastePhotoCard(createPhotoCard(element));
  });
};
renderInitialPhotoCards(initialCards);

//функция вставки карточек в начало узла списка
function pastePhotoCard(item) {
  photoCardsList.prepend(item);
};

//функция создания карточки
function createPhotoCard(item) {
  const cardElement = addPhotoTemplate.cloneNode(true);
  const photoCardPhoto = cardElement.querySelector('.photo-cards__photo');

  photoCardPhoto.src = item.link;
  cardElement.querySelector('.photo-cards__text').textContent = item.name;
  photoCardPhoto.alt = item.name;

  cardElement.querySelector('.photo-cards__button-like').addEventListener('click', toggleLikePhoto);
  cardElement.querySelector('.photo-cards__button-del').addEventListener('click', deletePhotoCards);
  photoCardPhoto.addEventListener('click', openOverlayPhotoPopUp);

  return cardElement;
};

//функция открытие поп-апов
function openPopUp(popup) {
  popup.classList.add('popup_opened');
  setListenerOnEsc(closePopUpWithEsc);
};
//функция закрытие поп-апов
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  removeListenerOnEsc(closePopUpWithEsc);
};

//функция закрытия поп-ап через кнопки или оверлей
function closePopUpWithButtonOrOverlay() {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopUp(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopUp(popup)
      }
    });
  });
};

closePopUpWithButtonOrOverlay();

//функция закрытия поп-ап через Esc
function closePopUpWithEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = page.querySelector('.popup_opened');
    closePopUp(popupOpened);
  }
};

//функция установки слушателя для Esc
function setListenerOnEsc(item) {
  page.addEventListener('keydown', item);
};
//функция удаления слушателя для Esc
function removeListenerOnEsc(item) {
  page.removeEventListener('keydown', item);
};

function setInactiveButton(form) {
  const submitButton = form.querySelector('.form__save-button');
  submitButton.disabled = true;
  submitButton.classList.add('form__save-button_inactive');
};

//функция открытия поп-ап редактирования профиля
function openPopUpEditInfo() {
  openPopUp(profileEditPopUp);

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  inputName.focus();
};

//функция сохранения введенных данных пользователем в форме редактирования профиля
function saveProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopUp(profileEditPopUp);
};

//функция добавления фотографий через поп-ап пользователем
function addPhotoByUser(evt) {
  evt.preventDefault();

  const photoByUser = { name: inputPhotoName.value, link: inputPhotoLink.value };

  pastePhotoCard(createPhotoCard(photoByUser));

  closePopUp(addPhotoPopUp);
  setInactiveButton(addPhotoForm);
  evt.target.reset();
};

//функция для лайка
function toggleLikePhoto(evt) {
  evt.target.classList.toggle('photo-cards__button-like_active');
};

//функция удаления карточек с фото
function deletePhotoCards(evt) {
  evt.target.closest('.photo-cards__item').remove();
};

//функция открытия поп-ап с фото
function openOverlayPhotoPopUp(event) {
  overlayPhotoImage.src = event.target.src;
  overlayPhotoImage.alt = event.target.alt;
  overlayPhotoDescription.textContent = event.target.alt;

  openPopUp(overlayPhotoPopUp);
  setListenerOnEscForDelAtr(closeOverlayPhotoPopUp);
};

//функция закрытия поп-ап с фото
function closeOverlayPhotoPopUp(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button') || evt.key === 'Escape') {
    overlayPhotoImage.removeAttribute('src');
    overlayPhotoImage.removeAttribute('alt');
    overlayPhotoDescription.textContent = '';
  }
  removeListenerOnEscForDelAtr(closeOverlayPhotoPopUp);
  overlayPhotoPopUp.removeEventListener('click', (evt) => closeOverlayPhotoPopUp(evt));
  };

function setListenerOnEscForDelAtr(item) {
  page.addEventListener('keydown', item)
};

function removeListenerOnEscForDelAtr(item) {
  page.removeEventListener('keydown', item)
};

profileEditButton.addEventListener('click', openPopUpEditInfo);
profileEditForm.addEventListener('submit', saveProfileEditForm);

addPhotoButton.addEventListener('click', () => openPopUp(addPhotoPopUp));
addPhotoPopUp.addEventListener('submit', addPhotoByUser);

overlayPhotoPopUp.addEventListener('click', (evt) => closeOverlayPhotoPopUp(evt));
