let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

let popUp = document.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');

let editForm = document.querySelector('.edit-form');
let inputName = editForm.querySelector('#profile-name');
let inputDescription = editForm.querySelector('#profile-description');

function openPopUp() {
  popUp.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  inputName.focus();
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function saveForm(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopUp(evt);
}

profileEditButton.addEventListener('click', openPopUp);
popUpCloseButton.addEventListener('click', closePopUp);
editForm.addEventListener('submit', saveForm);
