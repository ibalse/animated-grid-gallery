import galleryBEM from './GalleryBEM.js';

function createGalleryDF(id) {
  const { base, elements, modifiers: { galleryMod } } = galleryBEM;

  const template = document.createElement('template');
  template.innerHTML = `
      <div id="${id}" class="${base} ${galleryMod.loading}">
        <div class="${elements.content}"></div>
        <div class="${elements.emptyState}"><p>Mark photos as favourites to see them here.</p></div>
        <div class="${elements.loader}">LOADING...</div>
      </div>`;

  const root = new DocumentFragment();
  root.appendChild(template.content.cloneNode(true));

  return root;
}

export default createGalleryDF;
