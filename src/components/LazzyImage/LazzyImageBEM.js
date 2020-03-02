const base = 'image';

const elements = {
  image: `${base}__image`,
  loader: `${base}__loader`
};

const modifiers = {
  imageMod: {
    placeholder: `${base}--mod--placeholder`,
    loading: `${base}--mod--loading`,
    horizontal: `${base}--mod--horizontal`
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
