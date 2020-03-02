/**
 * Allows communication between modules via publish/sbscribe interface
 */

class EventBus {
  constructor() {
    this._subscriptions = {};
  }

  subscribe(event, callback) {
    if (!this._subscriptions[event]) this._subscriptions[event] = [];

    this._subscriptions[event].push(callback);
  }

  publish(event, data) {
    if (!this._subscriptions[event]) return;
    this._subscriptions[event].forEach((callback) => callback(data));
  }
}

export default new EventBus();
