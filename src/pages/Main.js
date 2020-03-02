import { Menu, Gallery } from '../components/index.js';

/**
 * Main page.
 * Renders document fragments. Creates list of alias mehods for app.
 */
class Main {
  constructor() {
    // variables
    this._menu = new Menu();
    this._gallery = new Gallery();
    this._loadingScreen = document.querySelector('.loading-screen');

    // public methods
    this.addPhotos = this._gallery.addPhotos;
    this.filter = this._gallery.filter;
    this.showTab = this._gallery.showTab;
    this.showFavourite = this._gallery.showFavourite;
    this.showLoader = this._gallery.showLoader;
    this.hideLoader = this._gallery.hideLoader;
  }

  hideLoadingScreen() {
    if (!this._loadingScreen) return;

    this._loadingScreen.classList.add('loading-screen--fade');
    setTimeout(() => {
      this._loadingScreen.remove();
    }, 1000);
  }

  render() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    const footer = document.createElement('footer');

    body.classList.add('body');
    main.classList.add('main');
    footer.classList.add('footer');
    footer.textContent = '2020';

    body.appendChild(this._menu.root);
    body.appendChild(main);
    main.appendChild(this._gallery.root);
    body.appendChild(footer);
  }
}

export default new Main();
