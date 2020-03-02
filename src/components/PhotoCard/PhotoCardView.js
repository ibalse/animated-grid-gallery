import cardBEM from './PhotoCardBEM.js';
import iconBEM from './IconBEM.js';

import {
  iconClear,
  iconFavourite,
  iconFavouriteBorder,
  iconUnfoldMore
} from '../../resources/icons.js';

function createPhotoCardDF({
  id,
  subtitle,
  title
}) {
  const cardBase = cardBEM.base;
  const cardElements = cardBEM.elements;
  const { cardMod, cardLayout } = cardBEM.modifiers;

  const iconBase = iconBEM.base;
  const iconElements = iconBEM.elements;
  const { iconMod } = iconBEM.modifiers;

  const template = document.createElement('template');
  template.innerHTML = `
      <div id="${id}" class="${cardBase} ${cardLayout.compact} ${cardMod.inactive}" tabindex="0">
        <div class="${cardElements.title}">
          <p>${title}</p>
        </div>
        <div class="${cardElements.subtitle}">
          <p>${subtitle}</p>
        </div>
        <div class="${cardElements.divider}"></div>
        <div class="${cardElements.actions}">
          <span class="${cardElements.actionExpand} ${iconBase} ${iconMod.inactive}">
            <span class=${iconElements.call}> ${iconUnfoldMore}</span>
            <span class=${iconElements.active}> ${iconUnfoldMore}</span>
            <span class=${iconElements.cancel}> ${iconClear}</span>
          </span>
          <span class="${cardElements.actionLike} ${iconBase} ${iconMod.inactive}">
            <span class=${iconElements.call}> ${iconFavouriteBorder}</span>
            <span class=${iconElements.active}> ${iconFavourite}</span>
            <span class=${iconElements.cancel}> ${iconClear}</span>
          </span>
        </div>
      </div>`;

  const root = new DocumentFragment();
  root.appendChild(template.content.cloneNode(true));

  return root;
}

export default createPhotoCardDF;
