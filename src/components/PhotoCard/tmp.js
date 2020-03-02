get isPhotoVertical() {
    return (this.photoAspectRatio < 1);
  }

  get photoAspectRatio() {
    const image = this.root.querySelector(`.${this._classes.image}`);

    return (image.naturalWidth / image.naturalHeight);
  }

  // is card.js

  _onPreload() {
    const { cardMod } = this._modifiers;
    const image = this.root.querySelector(`.${this._classes.image}`);

    preloadingObserver.unobserve(this.root);
    image.setAttribute('src', this.src); // cia settinam image src

    this._state.currentStage = 'loading';
    this.root.classList.add(cardMod.loading);
  }

  _onImgLoad() {
    if (this._state.currentStage == 'placeholder') return;

    console.log(this.photoAspectRatio, '< phAR on load <');

    const { cardMod } = this._modifiers;
    this._state.currentStage = 'inactive';
    this.root.classList.remove(cardMod.loading);

    viewportObserver.observe(this.root, `${this.id}--isVisible`);
  }
