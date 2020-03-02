class AnimationFactory {

  constructor() {
    this._objects = [];
    this._state = new Map();
  }

  register(obj) {
    if (!this._objects.includes(obj)) {
      this._objects.push(obj);
    }
  }

  getCurrentState() {
    const currentState = new Map();

    this._objects.forEach((obj) => {
      const { left, top, width, height, bottom } = obj.getBoundingClientRect();
      const isVisible = ((top < window.innerHeight) && (bottom > 0) == true);

      currentState.set(obj, { isVisible, left, top, width, height, bottom });
    });

    return currentState;
  }

  animate(oldState, duration = 300) {
    const newState = this.getCurrentState();

    this._objects.forEach((obj) => {
      const oldValue = oldState.get(obj);
      const newValue = newState.get(obj);
      if (oldValue.isVisible || newValue.isVisible) {

        const deltaX = oldValue.left - newValue.left;
        const deltaY = oldValue.top - newValue.top;

        obj.animate([{
          transformOrigin: 'top left',
          transform: `translate(${deltaX}px, ${deltaY}px)`
        }, {
          transformOrigin: 'top left',
          transform: 'none'
        }], {
          duration,
          easing: 'ease-in-out',
        });

      }
    });
  }
}

export const galleryAnimation = new AnimationFactory();
