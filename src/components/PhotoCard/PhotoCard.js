import events from '../../helpers/EventBus.js';
import CssVariables from '../../helpers/CssVariables.js';
import { viewportCenterObserver } from '../../helpers/ObserverFactory.js';
import { galleryAnimation } from '../../helpers/AnimationFactory.js';
import createPhotoCard from './PhotoCardView.js';
import cardBEM from './PhotoCardBEM.js';
import iconBEM from './IconBEM.js';
import LazzyImage from '../LazzyImage/LazzyImage.js';


class PhotoCard {
  constructor({
    id,
    classname,
    favouritedAt,
    src,
    ownername,
    title
  }) {
    // public methods
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    // localy handled events
    this._onConnectedToDOM = this._onConnectedToDOM.bind(this);
    this._onIsInCenter = this._onIsInCenter.bind(this);
    this._onExpandCard = this._onExpandCard.bind(this);
    this._onCollapseCard = this._onCollapseCard.bind(this);
    this._onIsLoaded = this._onIsLoaded.bind(this);

    // events sent to app.js via events.publish
    this._onLikeToggle = this._onLikeToggle.bind(this);

    // properties
    this.id = `card-${id}`;
    this.favouritedAt = favouritedAt || '';

    // data
    this._image = new LazzyImage({ id, src });
    this._classes = cardBEM.classes;
    this._modifiers = cardBEM.modifiers;
    this._transitions = cardBEM.transitions;
    this._df = createPhotoCard({
      id: this.id,
      subtitle: ownername,
      title,
      classes: classname
    });
    this.root.appendChild(this._image.root);

    // init
    if (this.favouritedAt) {
      const { iconMod } = iconBEM.modifiers;
      const iconLike = this.root.querySelector(`.${this._classes.actionLike}`);
      iconLike.classList.add(iconMod.active);
      iconLike.classList.remove(iconMod.inactive);
    }

    // events
    this.root
      .querySelector(`.${this._classes.actionLike}`)
      .addEventListener('click', this._onLikeToggle);

    this.root
      .querySelector(`.${iconBEM.elements.call}`)
      .addEventListener('click', this._onExpandCard);

    this.root
      .querySelector(`.${iconBEM.elements.cancel}`)
      .addEventListener('click', this._onCollapseCard);

    this.root
      .querySelector(`.${iconBEM.elements.active}`)
      .addEventListener('click', this._onCollapseCard);

    events.subscribe(`${this._image.id}--connectedToDOM`, this._onConnectedToDOM);
    events.subscribe(`${this.id}--isInCenter`, this._onIsInCenter);
    events.subscribe(`${this._image.id}--isLoaded`, this._onIsLoaded);
  }

  /**
   *  returns document fragment or DOM node,
   *  .querySelector() can be used on it equally either way
   */
  get root() {
    const root = document.getElementById(this.id);
    if (!root) return this._df.querySelector(`#${this.id}`);
    return root;
  }

  get isFavourite() { return !!this.favouritedAt; }

  get expandedSize() {
    const textWidth = CssVariables.getValue('--c-card-text-width');
    const textHeight = CssVariables.getValue('--c-card-text-height');
    const { clientHeight, clientWidth } = this.root;

    let width;
    let height;

    if (this._image.isHorizontal) {
      width = this._image.getWidth(clientHeight) + textWidth;
      height = clientHeight;
    } else {
      width = clientWidth;
      height = this._image.getHeight(clientWidth) + textHeight;
    }

    return { width, height };
  }

  get elementPosition() {
    const bodyRect = document.body.getBoundingClientRect()
      .top;
    const elementRect = this.root.getBoundingClientRect()
      .top;
    return elementRect - bodyRect;
  }

  show() {
    this.root.classList.remove('hidden');
  }

  hide() {
    this.root.classList.add('hidden');
  }

  _onConnectedToDOM() {
    viewportCenterObserver.observe(this.root, `${this.id}--isInCenter`);
  }

  _onIsInCenter() {
    viewportCenterObserver.unobserve(this.root);
    const { cardTr } = this._transitions;
    const { cardMod } = this._modifiers;

    this.root.classList.add(cardTr.fadeIn);

    setTimeout(() => {
      this.root.classList.remove(cardMod.inactive);
      this.root.classList.remove(cardTr.fadeIn);
    }, 4000);
  }

  _onIsLoaded() {
    const { cardMod } = this._modifiers;

    if (this._image.isHorizontal) this.root.classList.add(cardMod.horizontal);

    const cardHeight = this.root.clientHeight;
    const cardWidth = this.root.clientWidth;
    const { width, height } = this.expandedSize;

    const spanLength = this._image.isHorizontal
      ? `${Math.ceil(width / cardWidth)}H`
      : `${Math.ceil(height / cardHeight)}V`;

    this.root.classList.add(`span-${spanLength}`);
  }

  _onExpandCard() {
    const oldState = galleryAnimation.getCurrentState();

    const { cardLayout } = this._modifiers;
    const { cardTr } = this._transitions;
    const { iconMod } = iconBEM.modifiers;
    const expandIcon = this.root.querySelector(`.${this._classes.actionExpand}`);

    setTimeout(() => {
      expandIcon.classList.add(iconMod.active);
      expandIcon.classList.remove(iconMod.inactive);
      this.root.classList.add(cardLayout.expanded);
      this.root.classList.remove(cardLayout.compact);
      this.root.classList.add(cardTr.expand);
      galleryAnimation.animate(oldState);
    }, 300);

    const menuHeight = CssVariables.getValue('--c-menu-height');
    setTimeout(() => {
      window.scrollTo({
        top: this.elementPosition - menuHeight,
        behavior: 'smooth'
      });
    }, 700);

    setTimeout(() => {
      this.root.classList.remove(cardTr.expand);
    }, 1000);
  }

  _onCollapseCard() {
    const oldState = galleryAnimation.getCurrentState();

    const { cardLayout } = this._modifiers;
    const { cardTr } = this._transitions;
    const { iconMod } = iconBEM.modifiers;
    const expandIcon = this.root.querySelector(`.${this._classes.actionExpand}`);

    this.root.classList.add(cardTr.shrink);
    this.root.classList.remove(cardTr.expand); // jei siuo metu expandinasi
    expandIcon.classList.add(iconMod.inactive); // kaip sita perdaryti
    expandIcon.classList.remove(iconMod.active); // kaip sita perdaryti

    setTimeout(() => {
      this.root.classList.add(cardLayout.compact);
      this.root.classList.remove(cardLayout.expanded);
      this.root.classList.remove(cardTr.shrink);
      galleryAnimation.animate(oldState, 500);
    }, 800);
  }

  _onLikeToggle() {
    const oldState = galleryAnimation.getCurrentState();
    const likeIcon = this.root.querySelector(`.${this._classes.actionLike}`);
    const { iconMod } = iconBEM.modifiers;

    if (this.favouritedAt) {
      this.favouritedAt = '';
      likeIcon.classList.add(iconMod.inactive);
      likeIcon.classList.remove(iconMod.active);
    } else {
      this.favouritedAt = Date.now()
        .toString();
      likeIcon.classList.add(iconMod.active);
      likeIcon.classList.remove(iconMod.inactive);
    }

    events.publish('favouriteUpdated', {
      id: this._image.id,
      favouritedAt: this.favouritedAt
    });

    galleryAnimation.animate(oldState);
  }
}

export default PhotoCard;
