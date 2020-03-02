import imageBEM from './LazzyImageBEM.js';

function createLazzyImageDF({ id }) {
  const { base, elements, modifiers: { imageMod } } = imageBEM;

  const template = document.createElement('template');
  template.innerHTML = `
    <div id="${id}" class="${base} ${imageMod.placeholder}"> 
      <img class="${elements.image}" src="resources/1px.jpg" alt="" />
      <span class="${elements.loader}"></span>
    </div>`;

  const root = new DocumentFragment();
  root.appendChild(template.content.cloneNode(true));

  return root;
}

export default createLazzyImageDF;
