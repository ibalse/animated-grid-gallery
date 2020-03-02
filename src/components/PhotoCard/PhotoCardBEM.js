const base = 'card';

const elements = {
  image: `${base}__image`,
  title: `${base}__title`,
  divider: `${base}__divider`,
  subtitle: `${base}__subtitle`,
  actions: `${base}__actions`,
  actionLike: `${base}__actions__like`,
  actionExpand: `${base}__actions__expand`,
  loader: `${base}__loader`
};

const modifiers = {
  cardMod: {
    inactive: `${base}--mod--inactive`,
    horizontal: `${base}--mod--horizontal`
  },
  cardLayout: {
    compact: `${base}--layout--compact`,
    expanded: `${base}--layout--expanded`
  }
};

const transitions = {
  cardTr: {
    expand: `${base}--transition--expand`,
    shrink: `${base}--transition--shrink`,
    fadeIn: `${base}--transition--fade-in`
  }
};

export default {
  base,
  elements,
  modifiers,
  transitions,
  get classes() {
    return { base, ...elements };
  }
};
