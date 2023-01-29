import './index.css'
import { validSettings } from "../components/initialData.js";
import Section from "../components/Section.js";
import { initialCards,
  templateSelector,
  cardListSelector,
  profileNameSelector,
  profileDescriptionSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupWithImageSelector,
  buttonEditProfile,
  buttonOpenPopUpAddCard,
  inputName,
  inputDescription
} from '../utils/utils';
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

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
const validatorAddCardForm = new FormValidator(validSettings, popupAddCardSelector);
validatorAddCardForm.enableValidation();

const validatorEditProfileForm = new FormValidator(validSettings, popupEditProfileSelector);
validatorEditProfileForm.enableValidation();

//поп-ап с фото
const popUpWithOverlay = new PopupWithImage(popupWithImageSelector);

//поп-ап с формой добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  submitForm: (item) => {
    cardRender.addItem(createNewCard(item, templateSelector));
  }
})

//поп-ап с формой редактирования профиля
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

