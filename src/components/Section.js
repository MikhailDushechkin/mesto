export default class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(arr) {
    arr.forEach(item => {
      this._renderer(item)
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
