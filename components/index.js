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

const profile = document.querySelector('.profile');
//кнопка редактирования профиля
const profileEditButton = profile.querySelector('.profile__edit-button');
//кнопка добавления фотографий
const addPhotoButton = profile.querySelector('.profile__add-button');
//блок с имененем профиля
const profileName = profile.querySelector('.profile__name');
//блок с описанием профиля
const profileDescription = profile.querySelector('.profile__description');

//поп-ап редактирования профиля
const profileEditPopUp = document.querySelector('.edit-popup');
const profileEditCloseButton = profileEditPopUp.querySelector('.popup-edit__close-button');

//поп-ап добавления фотографий
const addPhotoPopUp = document.querySelector('.add-popup');
const addPhotoCloseButton = addPhotoPopUp.querySelector('.popup-add__close-button');

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

//Список с фото карточками
const photoCardsList = document.querySelector('.photo-cards__list');

//поп-ап с фото
const overlayPhotoPopUp = document.querySelector('.overlay-photo');
const overlayPhotoImage = overlayPhotoPopUp.querySelector('.overlay-photo__image');
const overlayPhotoDescription = overlayPhotoPopUp.querySelector('.overlay-photo__description');
const overlayPhotoCloseButton = overlayPhotoPopUp.querySelector('.overlay-photo__close-button');

//функция открытия поп-ап редактирования профиля
function openPopUpEditInfo() {
  profileEditPopUp.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  inputName.focus();
};
//функция закрытия поп-ап редактирования профиля
function closePopUpEditInfo() {
    profileEditPopUp.classList.remove('popup_opened');
};
//функция сохранения введенных данных пользователем в форме редактирования профиля
function saveProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopUpEditInfo();
};

//функция открытия поп-ап добавления фото
function openPopUpAddPhoto() {
  addPhotoPopUp.classList.add('popup_opened');
};
//функция закрытия поп-ап добавления фото
function closePopUpAddPhoto() {
  addPhotoPopUp.classList.remove('popup_opened');
};

//функция добавления фотографий
function addPhotoCards(name, link) {
  const addPhotoTemplate = document.querySelector('#photo-cards-element').content;
  const addPhotoElement = addPhotoTemplate.cloneNode(true);

  addPhotoElement.querySelector('.photo-cards__photo').src = link;
  addPhotoElement.querySelector('.photo-cards__text').textContent = name;
  addPhotoElement.querySelector('.photo-cards__photo').alt = name;

  photoCardsList.prepend(addPhotoElement);
};

function initialPhotoCards(arr) {
  arr.forEach(element => {
    addPhotoCards(element.name, element.link);
  });
};

//функция добавления фотографий через поп-ап пользователем
function addPhotoByUser(evt) {
  evt.preventDefault();

  addPhotoCards(inputPhotoName.value, inputPhotoLink.value);

  closePopUpAddPhoto();
};

//функция для лайка
function likePhoto(evt) {
  const likePhotoTarget = evt.target.closest('.photo-cards__button-like');
  if(!likePhotoTarget) return;
  evt.target.classList.toggle('photo-cards__button-like_active');
}

//функция удаления карточек с фото
function deletePhotoCards(evt) {
  const deletePhotoCard = evt.target.closest('.photo-cards__button-del');
  if(!deletePhotoCard) return;
  evt.target.closest('.photo-cards__item').remove();
}

initialPhotoCards(initialCards);

//коллекция карточек с фото из списка
const photoCardsImage = photoCardsList.querySelectorAll('.photo-cards__photo');

//функция открытия поп-ап с фото
function openOverlayPhotoPopUp() {
  photoCardsImage.forEach(item => {
    item.addEventListener('click', (e) => {
      overlayPhotoPopUp.classList.add('popup_opened');
      overlayPhotoImage.src = e.target.src;
      overlayPhotoDescription.textContent = e.target.alt;
    })
  });
}

//функция закрытия поп-ап с фото
function closeOverlayPhotoPopUp() {
  overlayPhotoPopUp.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopUpEditInfo);
profileEditCloseButton.addEventListener('click', closePopUpEditInfo);
profileEditForm.addEventListener('submit', saveProfileEditForm);

addPhotoButton.addEventListener('click', openPopUpAddPhoto);
addPhotoCloseButton.addEventListener('click', closePopUpAddPhoto);
addPhotoPopUp.addEventListener('submit', addPhotoByUser);

photoCardsList.addEventListener('click', likePhoto);
photoCardsList.addEventListener('click', deletePhotoCards);
photoCardsList.addEventListener('click', openOverlayPhotoPopUp);

overlayPhotoCloseButton.addEventListener('click', closeOverlayPhotoPopUp);
