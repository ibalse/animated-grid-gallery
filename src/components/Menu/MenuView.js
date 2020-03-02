import { iconFavourite, iconClear } from '../../resources/icons.js';
import menuBEM from './MenuBEM.js';

function createMenuDF({ id }) {
  const { base, elements } = menuBEM;
  const template = document.createElement('template');

  template.innerHTML = `
    <div id="${id}" class="${base}">
        <div class="${elements.content}">
          <span class="${elements.item}" data-id="favourite">
            <span class="icon" data-id="favourite"> ${iconFavourite}</span>
            <span class="icon" data-id="close"> ${iconClear}</span>
          </span>
        </div>
    </div>`;

  const root = new DocumentFragment();
  root.appendChild(template.content.cloneNode(true));

  return root;
}

export default createMenuDF;
