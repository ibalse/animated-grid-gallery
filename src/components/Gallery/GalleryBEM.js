const base = 'gallery';

const elements = {
  content: `${base}__content`,
  item: `${base}__item`,
  emptyState: `${base}__empty-state`,
  loader: `${base}__loader`
};

const modifiers = {
  galleryMod: {
    loading: `${base}--loading`,
    empty: `${base}--empty`
  }
};

export default {
  base,
  elements,
  modifiers,
  get classes() {
    return { base, ...elements };
  }
};
