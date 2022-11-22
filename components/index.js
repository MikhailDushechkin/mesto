const profile = document.querySelector('.profile');
//кнопка редактирования профиля
const profileEditButton = profile.querySelector('.profile__edit-button');
//кнопка добавления фотографий
const addPhotoButton = profile.querySelector('.profile__add-button');
//блок с имененем профиля
const profileName = profile.querySelector('.profile__name');
//блок с описанием профиля
const profileDescription = profile.querySelector('.profile__description');

const profileEditPopUp = document.querySelector('.edit-popup');
//кнопка закрытия поп-ап с редактированием профиля
const profileEditCloseButton = profileEditPopUp.querySelector('.popup-edit__close-button');

const addPhotoPopUp = document.querySelector('.add-popup');
//кнопка закрытия поп-ап с добавлением фотографий
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

//функция открытия поп-ап редактирования профиля
function openPopUpEditInfo() {
  profileEditPopUp.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  inputName.focus();
}
//функция закрытия поп-ап редактирования профиля
function closePopUpEditInfo() {
    profileEditPopUp.classList.remove('popup_opened');
}
//функция сохранения введенных данных пользователем в форме редактирования профиля
function saveProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopUpEditInfo();
}

//функция открытия поп-ап добавления фото
function openPopUpAddPhoto() {
  addPhotoPopUp.classList.add('popup_opened');
}
//функция закрытия поп-ап добавления фото
function closePopUpAddPhoto() {
  addPhotoPopUp.classList.remove('popup_opened');
}

const photoList = document.querySelector('.photo-cards__list');

//функция добавления фотографий
function addPhotoCards(name, link) {
  const addPhotoTemplate = document.querySelector('#photo-cards-element').content;
  const addPhotoElement = addPhotoTemplate.cloneNode(true);

  addPhotoElement.querySelector('.photo-cards__photo').src = link;
  addPhotoElement.querySelector('.photo-cards__text').textContent = name;

  photoList.prepend(addPhotoElement);
}

function initialPhotoCards(arr) {
  arr.forEach(element => {
    addPhotoCards(element.name, element.link);
  });
}


//функция добавления фотографий через поп-ап пользователем
function addPhotoByUser(evt) {
  evt.preventDefault();

  addPhotoCards(inputPhotoName.value, inputPhotoLink.value);

  closePopUpAddPhoto();
}

//находим секцию с карточками
const photoCards = document.querySelector('.photo-cards');
//ставит или снимает лайк на опредленной карточке
photoCards.addEventListener('click', evt => {
  const likePhotoTarget = evt.target.closest('.photo-cards__button-like');
  if(!likePhotoTarget) return;
  evt.target.classList.toggle('photo-cards__button-like_active');
});


//удаление карточек с фото по клику на "урну"
photoCards.addEventListener('click', evt => {
  const deletePhoto = evt.target.closest('.photo-cards__button-del');
  if(!deletePhoto) return;
  evt.target.closest('.photo-cards__item').remove();
})

profileEditButton.addEventListener('click', openPopUpEditInfo);
profileEditCloseButton.addEventListener('click', closePopUpEditInfo);
profileEditForm.addEventListener('submit', saveProfileEditForm);

addPhotoButton.addEventListener('click', openPopUpAddPhoto);
addPhotoCloseButton.addEventListener('click', closePopUpAddPhoto);
addPhotoPopUp.addEventListener('submit', addPhotoByUser);

initialPhotoCards(initialCards);
