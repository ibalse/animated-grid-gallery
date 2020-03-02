const base = 'icon';

const elements = {
  call: `${base}__call`,
  active: `${base}__active`,
  cancel: `${base}__cancel`
};

const modifiers = {
  iconMod: {
    active: `${base}--mod--active`,
    inactive: `${base}--mod--inactive`,
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
