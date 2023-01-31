export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nickname = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nickname.textContent,
      description: this._userInfo.textContent
    }
  }

  setUserInfo(data) {
    this._nickname.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._avatar.alt = `Аватар пользователя ${data.name}`
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
