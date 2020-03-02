import events from '../../helpers/EventBus.js';
import { preloadingObserver } from '../../helpers/ObserverFactory.js';
import createLazzyImageDF from './LazzyImageView.js';
import imageBEM from './LazzyImageBEM.js';

class LazzyImage {
  constructor({ id, src }) {
    // localy handled events
    this._onConnectedToDOM = this._onConnectedToDOM.bind(this);
    this._onPreload = this._onPreload.bind(this);
    this._onImgLoad = this._onImgLoad.bind(this);

    // methods
    this.getWidth = this.getWidth.bind(this);
    this.getHeight = this.getHeight.bind(this);

    // properties
    this.id = id;
    this.src = src;

    // data
    this._modifiers = imageBEM.modifiers;
    this._elements = imageBEM.elements;
    this._df = createLazzyImageDF({
      id: this.id
    });

    // events
    this.root
      .querySelector(`.${this._elements.image}`)
      .addEventListener('load', this._onImgLoad);
    events.subscribe(`${this.id}--connectedToDOM`, this._onConnectedToDOM);
    events.subscribe(`${this.id}--preload`, this._onPreload);
  }

  get root() {
    const root = document.getElementById(this.id);
    if (!root) return this._df;
    return root;
  }

  get naturalWidth() {
    const image = this.root.querySelector(`.${this._elements.image}`);
    return image.naturalWidth;
  }

  get naturalHeight() {
    const image = this.root.querySelector(`.${this._elements.image}`);
    return image.naturalHeight;
  }

  get aspectRatio() {
    return (this.naturalWidth / this.naturalHeight);
  }

  get isHorizontal() {
    return (this.aspectRatio >= 1);
  }

  getWidth(height) {
    return (this.naturalWidth * height) / this.naturalHeight;
  }

  getHeight(width) {
    return (this.naturalHeight * width) / this.naturalWidth;
  }

  _onConnectedToDOM() {
    preloadingObserver.observe(this.root, `${this.id}--preload`);
  }

  _onPreload() {
    const { imageMod } = this._modifiers;
    const image = this.root.querySelector(`.${this._elements.image}`);

    preloadingObserver.unobserve(this.root);

    image.setAttribute('src', this.src);
    this.root.classList.add(imageMod.loading);
    this.root.classList.remove(imageMod.placeholder);
  }

  _onImgLoad() {
    const { imageMod } = this._modifiers;

    if (this.root.classList.contains(imageMod.placeholder)) return;
    if (!this.isHorizontal) this.root.classList.add(imageMod.horizontal);
    this.root.classList.remove(imageMod.loading);
    events.publish(`${this.id}--isLoaded`);
  }
}

export default LazzyImage;
