import events from './EventBus.js';

class ObserverFactory {
  constructor(options) {
    this.observe = this.observe.bind(this);
    this.unobserve = this.unobserve.bind(this);
    this._callback = this._callback.bind(this);

    this._observer = new IntersectionObserver(this._callback, options);
    this._messages = { undefined: [] };
  }

  observe(obj, message) {
    this._observer.observe(obj);

    const { id } = obj;
    if (!this._messages[id]) this._messages[id] = [];
    this._messages[id].push(message);
  }

  unobserve(obj) {
    this._observer.unobserve(obj);
    this._messages[obj.id] = [];
  }

  _callback(entries) {
    entries.forEach((entry) => {
      const { id } = entry.target;
      if ((entry.isIntersecting) && (id in this._messages)) {
        this._messages[id].forEach((message) => events.publish(message));
      }
    });
  }
}

export const viewportCenterObserver = new ObserverFactory({ rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });
export const preloadingObserver = new ObserverFactory({ rootMargin: '100px' });
