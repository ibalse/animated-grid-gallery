/**
 *  Application controller and application starting point.
 *  Listens to events and calls store or page methods.
 */

import store from './storage/Store.js';
import main from './pages/Main.js';
import events from './helpers/EventBus.js';

const tabs = {
  all: { scrollY: 0 },
  favourite: { scrollY: 0 }
};

const stages = [
  'loading',
  'fetching',
  'finished'
];

const state = {
  activeTabIndex: 'all',
  currentStage: stages[0],
};

/**
 * Event handlers
 */

const onMenuClick = (tabName) => {
  tabs[state.activeTabIndex].scrollY = window.scrollY;
  state.activeTabIndex = tabName;
  main.showTab(tabName);
  window.scrollTo(0, tabs[tabName].scrollY);
  events.publish('scrollYChanged', window.scrollY);
};

const onPhotosLoaded = (data) => {
  if (data.size == 0 && state.currentStage != 'finished') {
    store.loadNewPage();
    return;
  }
  main.addPhotos(data);
};

const onFavouriteUpdated = (data) => {
  store.updateFavourite(data);
  if (state.activeTabIndex == 'favourite') main.showFavourite();
};

const onBottomReached = () => {
  if (state.activeTabIndex == 'all' && state.currentStage != 'finished') store.loadNewPage();
};

const onIsFetching = () => {
  if (state.currentStage != 'loading') main.showLoader();
};

/**
 * Initialization
 */

const init = () => {
  main.render();

  events.subscribe('menuClick', onMenuClick);
  events.subscribe('photosLoaded', onPhotosLoaded);
  events.subscribe('favouriteUpdated', onFavouriteUpdated);
  events.subscribe('bottomReached', onBottomReached);
  events.subscribe('isFetching', onIsFetching);
  events.subscribe('fetchingIsFinished', () => { main.hideLoader(); });
  events.subscribe('isAllFetched', () => { state.currentStage = 'finished'; });

  store.loadSessionStorage();
  state.currentStage = 'fetching';
  main.hideLoadingScreen();
};

document.addEventListener('DOMContentLoaded', init);
