import './index.css'
import { validSettings } from "../utils/initialData.js";
import Section from "../components/Section.js";
import {
  templateSelector,
  cardListSelector,
  avatarProfileSelector,
  profileNameSelector,
  profileDescriptionSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupWithImageSelector,
  popupWithConfirmSelector,
  buttonEditProfile,
  buttonOpenPopUpAddCard,
  inputName,
  inputDescription,
  buttonAvatarProfile
} from '../utils/utils.js';
import Api from '../components/Api';
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '2ef49e38-7e23-4031-9842-2240783d12c1',
    'Content-Type': 'application/json'
  }
});

//данные пользователя
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector, avatarProfileSelector);

//функция создания новых карточек
function createNewCard(data, templateSelector) {
  const initCard = new Card(
    data,
    {
    handleCardClick: () => {
      popupWithOverlay.open(data.name, data.link);
    },
    handleLikeClick: () => {
      initCard.toggleLike()
    },
    handleDeleteCardClick: () => {
      popupWithConfirm.confirm(() =>{
        popupWithConfirm.renderLoading(true);
        api.deleteCard(data._id)
      .then(() => {
        initCard.deleteCard();
        popupWithConfirm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithConfirm.renderLoading(false);
      })
      })
      popupWithConfirm.open()
    }},
    templateSelector,
    api,
    userId
    );

  return initCard.createCard();
};

//отрисовка элементов на странице
const cardRender = new Section((item) => {
    cardRender.addItem(createNewCard(item, templateSelector))
  }, cardListSelector)


//создание экземпляров валидации форм
const validatorAddCardForm = new FormValidator(validSettings, popupAddCardSelector);
validatorAddCardForm.enableValidation();

const validatorEditProfileForm = new FormValidator(validSettings, popupEditProfileSelector);
validatorEditProfileForm.enableValidation();

const validatorEditAvatarForm = new FormValidator(validSettings, popupEditAvatarSelector);
validatorEditAvatarForm.enableValidation();

//поп-ап с фото
const popupWithOverlay = new PopupWithImage(popupWithImageSelector);
//поп-ап с подтверждением
const popupWithConfirm = new PopupWithConfirm(popupWithConfirmSelector)

//поп-ап с формой добавления карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector,(item) => {
  popupAddCard.renderLoading(true);
  api.addNewCard(item)
  .then((res) => {
    cardRender.addItem(createNewCard(res, templateSelector));
    popupAddCard.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupAddCard.renderLoading(false)
  })
  })

//поп-ап с формой редактирования профиля
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (userData) => {
    popupEditProfile.renderLoading(true)
    api.setUserData(userData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoading(false)
    })
  })

//поп-ап с формой редактирования аватара
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (userData) => {
  popupEditAvatar.renderLoading(true)
  api.setUserAvatar(userData)
  .then((data) => {
    userInfo.setUserAvatar(data);
    popupEditAvatar.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupEditAvatar.renderLoading(false)
  })
})

let userId;

// возвращает результат исполнения нужных промисов
api.getInitialData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
    cardRender.renderItems(cards)
  })
  .catch((err) => console.log(err))

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  const {name, description} = userInfo.getUserInfo();
  inputName.focus();
  inputName.value = name;
  inputDescription.value = description;

});

buttonOpenPopUpAddCard.addEventListener('click', () => popupAddCard.open());

buttonAvatarProfile.addEventListener('click', () => popupEditAvatar.open())
