let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let addPhotoButton = profile.querySelector('.profile__add-button');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

let profileEditPopUp = document.querySelector('.edit-popup');
let profileEditCloseButton = profileEditPopUp.querySelector('.popup-edit__close-button');

let addPhotoPopUp = document.querySelector('.add-popup');
let addPhotoCloseButton = addPhotoPopUp.querySelector('.popup-add__close-button');

let profileEditForm = document.querySelector('.edit-form');
let addPhotoForm = document.querySelector('.add-cards-form');
let inputName = profileEditForm.querySelector('#profile-name');
let inputDescription = profileEditForm.querySelector('#profile-description');

function openPopUpAddPhoto() {
  addPhotoPopUp.classList.add('popup_opened');
}

function closePopUpAddPhoto() {
  addPhotoPopUp.classList.remove('popup_opened');
}

function openPopUpEditInfo() {
  profileEditPopUp.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  inputName.focus();
}

function closePopUpEditInfo() {
  profileEditPopUp.classList.remove('popup_opened');
}

function saveProfileEditForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopUpEditInfo();
}

profileEditButton.addEventListener('click', openPopUpEditInfo);
profileEditCloseButton.addEventListener('click', closePopUpEditInfo);
profileEditForm.addEventListener('submit', saveProfileEditForm);

addPhotoButton.addEventListener('click', openPopUpAddPhoto);
addPhotoCloseButton.addEventListener('click', closePopUpAddPhoto);
