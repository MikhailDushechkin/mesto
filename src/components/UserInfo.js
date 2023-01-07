export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nickname = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nickname.textContent,
      description: this._userInfo.textContent
    }
  }

  setUserInfo(data) {
    this._nickname.textContent = data.name;
    this._userInfo.textContent = data.description;
  }
}
