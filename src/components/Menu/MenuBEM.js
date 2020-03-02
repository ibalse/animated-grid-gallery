const base = 'menu';

const elements = {
  item: `${base}__item`,
  content: `${base}__content`
};

const modifiers = {
  menuMod: {
    mini: `${base}--mini`
  },
  itemMod: {
    active: `${elements.item}--active`
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
