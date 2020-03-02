import PhotoCard from '../PhotoCard/PhotoCard.js';
import events from '../../helpers/EventBus.js';
import { galleryAnimation } from '../../helpers/AnimationFactory.js';
import { preloadingObserver } from '../../helpers/ObserverFactory.js';
import createGalleryDF from './GalleryView.js';
import galleryBEM from './GalleryBEM.js';

class Gallery {
  constructor(id = 'gallery') {
    // public methods
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.addPhotos = this.addPhotos.bind(this);
    this.showTab = this.showTab.bind(this);
    this.showFavourite = this.showFavourite.bind(this);
    this.showAll = this.showAll.bind(this);

    // properties
    this.id = id;

    // data
    this._df = createGalleryDF(this.id);
    this._photos = [];
    this._animation = new Animation();

    // events
  }

  get root() {
    const root = document.getElementById(this.id);
    if (!root) return this._df.querySelector(`#${this.id}`);
    return root;
  }

  set scrollMarker(element) {
    if (this._scrollMarker == element) return;
    if (this._scrollMarker) preloadingObserver.unobserve(this._scrollMarker);

    preloadingObserver.observe(element, 'bottomReached');
    this._scrollMarker = element;
  }

  addPhotos(photoData) {
    const { elements: { item: classes } } = galleryBEM;

    photoData.forEach((photo, id) => {
      const content = this.root.querySelector(`.${galleryBEM.elements.content}`);
      const photoCard = new PhotoCard({ ...photo, classes, id });

      this._photos.push(photoCard);
      content.appendChild(photoCard.root);
      galleryAnimation.register(photoCard.root);

      // čia nėra garantijos, kad jau bus prijungta
      events.publish(`${id}--connectedToDOM`);
    });

    const lastPhoto = this._photos[this._photos.length - 1];
    this.scrollMarker = lastPhoto ? lastPhoto.root : undefined;
  }

  showTab(name) {
    switch (name) {
      case 'all':
        this.hideEmptyState();
        this.showAll();
        break;
      case 'favourite':
        this.hideLoader();
        this.showFavourite();
        break;
      default:
        // do nothing
    }
  }

  showFavourite() {
    this._photos.forEach((photo) => {
      if (photo.isFavourite) photo.show();
      else photo.hide();
    });

    const hasFavourite = this._photos.find((photo) => photo.isFavourite);

    if (hasFavourite) this.hideEmptyState();
    else this.showEmptyState();
  }

  showAll() {
    this._photos.forEach((photo) => photo.show());
  }

  showLoader() {
    const { galleryMod } = galleryBEM.modifiers;
    this.root.classList.add(`${galleryMod.loading}`);
  }

  hideLoader() {
    const { galleryMod } = galleryBEM.modifiers;
    this.root.classList.remove(`${galleryMod.loading}`);
  }

  showEmptyState() {
    const { galleryMod } = galleryBEM.modifiers;
    this.root.classList.add(`${galleryMod.empty}`);
  }

  hideEmptyState() {
    const { galleryMod } = galleryBEM.modifiers;
    this.root.classList.remove(`${galleryMod.empty}`);
  }

}

export default Gallery;
