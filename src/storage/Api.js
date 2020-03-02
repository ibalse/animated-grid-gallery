import flickr from './Flickr.js';
import events from '../helpers/EventBus.js';

class Api {
  constructor({ config: { endpoint, galleries = [], searchParams }, transformer }) {
    this.transformer = transformer;
    this.endpoint = endpoint;
    this.galleries = galleries.reverse();
    this.searchParams = { ...searchParams, gallery_id: galleries.pop() };
  }

  get apiUrl() {
    const searchParams = new URLSearchParams({ ...this.searchParams });
    const rez = `${this.endpoint}/?${searchParams.toString()}`;
    return rez;
  }

  setNextPage({ currentPage, allPages }) {
    const nextPage = currentPage + 1;

    if (nextPage <= allPages) {
      this.searchParams = { ...this.searchParams, page: nextPage };

    } else if (this.galleries.length > 0) {
      this.searchParams = { ...this.searchParams, page: 1, gallery_id: this.galleries.pop() };

    } else {
      events.publish('isAllFetched');
    }
  }

  async getNextPage() {
    try {
      return fetch(this.apiUrl)
        .then((response) => response.json())
        .then((json) => this.transformer(json))
        .then(({ meta, photos }) => {
          this.setNextPage(meta);
          return photos;
        });
    } catch (err) {
      console.log(err, '<< ERR');
      return err;
    }
  }

}

export const flickrApi = new Api({ config: flickr.config, transformer: flickr.transform });
