import events from '../../helpers/EventBus.js';
import createMenuDF from './MenuView.js';
import menuBEM from './MenuBEM.js';


class Menu {
  constructor(id = 'menu') {
    // public methods
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);

    // localy handled events
    this._onFavouriteToggle = this._onFavouriteToggle.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onScrollYChanged = this._onScrollYChanged.bind(this);

    // properties
    this.id = id;

    // data
    this._df = createMenuDF({
      id: this.id,
      favouriteClickHandler: this._onFavouriteClick,
      allClickHandler: this._onAllClick
    });

    this._state = {
      scrollDirection: 0, // {-1 -- UP, +1 -- DOWN, 0 -- undefined}
      viewScrollY: window.scrollY
    };

    // events
    window.addEventListener('scroll', this._onScroll);
    events.subscribe('scrollYChanged', this._onScrollYChanged);

    this.root
      .querySelector('[data-id="favourite"]')
      .addEventListener('click', this._onFavouriteToggle);
  }

  get root() {
    const root = document.getElementById(this.id);
    if (!root) return this._df.querySelector(`#${this.id}`);
    return root;
  }

  get activeTab() {
    const { itemMod } = menuBEM.modifiers;
    return this.root.querySelector(`.${itemMod.active}`);
  }

  set activeTab(name) {
    const tab = this.root.querySelector(`[data-id="${name}"]`);
    if (!tab || (tab == this.activeTab)) return;

    const { itemMod } = menuBEM.modifiers;
    this.activeTab.classList.remove(`${itemMod.active}`);
    tab.classList.add(`${itemMod.active}`);
  }

  showMenu() {
    const { menuMod } = menuBEM.modifiers;
    this.root.classList.remove(`${menuMod.mini}`);
  }

  hideMenu() {
    const { menuMod } = menuBEM.modifiers;
    this.root.classList.add(`${menuMod.mini}`);
  }

  _onFavouriteToggle() {
    const { itemMod } = menuBEM.modifiers;
    const favourite = this.root.querySelector('[data-id="favourite"]');

    if (favourite.classList.contains(itemMod.active)) {
      favourite.classList.remove(itemMod.active);
      events.publish('menuClick', 'all');
    } else {
      favourite.classList.add(itemMod.active);
      events.publish('menuClick', 'favourite');
    }
    this.showMenu();
  }

  _onFavouriteClick() {
    this.activeTab = 'favourite';
    events.publish('menuClick', 'favourite');
    this.showMenu();
  }

  _onAllClick() {
    this.activeTab = 'all';
    events.publish('menuClick', 'all');
    this.showMenu();
  }

  _onScroll() {
    // distance > 0 - scrolling down,
    // distance < 0 - scrolling up
    const distance = window.scrollY - this._state.viewScrollY;
    this._state.viewScrollY = window.scrollY;

    if (distance < 0 && this._state.scrollDirection >= 0) this.showMenu();
    if (distance > 0 && this._state.scrollDirection <= 0) this.hideMenu();

    this._state.scrollDirection = distance < 0 ? -1 : 1;
  }

  _onScrollYChanged(scrollY) {
    this._state.scrollY = scrollY;
    this._state.scrollDirection = 0;
  }
}

export default Menu;
