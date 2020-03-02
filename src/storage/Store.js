import events from '../helpers/EventBus.js';
import { flickrApi } from './Api.js';

class Store {
  constructor() {
    // public methods
    this.loadSessionStorage = this.loadSessionStorage.bind(this);
    this.loadNewPage = this.loadNewPage.bind(this);
    this.updateFavourite = this.updateFavourite.bind(this);

    // private methods
    this._saveToStorage = this._saveToStorage.bind(this);
    this._addPhotos = this._addPhotos.bind(this);

    // data
    this._photos = new Map();

    // events
    window.addEventListener('beforeunload', this._saveToStorage);
  }

  loadNewPage() {
    events.publish('isFetching');
    flickrApi
      .getNextPage()
      .then((photos) => {
        this._addPhotos(photos);
        events.publish('fetchingIsFinished');
      });
  }

  updateFavourite({ id, favouritedAt }) {
    const updatedPhoto = { ...this._photos.get(id), favouritedAt };
    this._photos = new Map([...this._photos])
      .set(id, updatedPhoto);
  }

  loadSessionStorage() {
    const photos = JSON.parse(sessionStorage.getItem('photos')) || [];
    this._addPhotos(new Map([...photos]));
  }

  _addPhotos(photos) {
    const newPhotos = new Map();

    photos.forEach((photo, id) => {
      if (!this._photos.has(id)) {
        this._photos.set(id, photo);
        newPhotos.set(id, photo);
      }
    });

    events.publish('photosLoaded', newPhotos);
  }

  _saveToStorage() {
    sessionStorage.setItem('photos', JSON.stringify([...this._photos]));
    // sessionStorage.setItem('photosSaved', JSON.stringify([...this._photos]));
  }
}

export default new Store();
