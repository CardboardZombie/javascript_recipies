// renderStoreUI.js

// renderStoreUI.js

import { storeItems } from './storeData.js';

export function renderStoreTabs() {
  Object.keys(storeItems).forEach(tabName => {
    const tabContainer = document.getElementById(tabName);
    if (!tabContainer) return;

    tabContainer.innerHTML = ''; // Clear old content

    storeItems[tabName].forEach(item => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('modal-item');

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('shop-description');
      nameSpan.textContent = item.name;

      const button = document.createElement('button');
      button.classList.add('shop-btn');
      button.setAttribute('data-item', item.name);
      button.setAttribute('data-cost', item.cost);
      button.textContent = item.label;

      itemContainer.appendChild(nameSpan);
      itemContainer.appendChild(button);
      tabContainer.appendChild(itemContainer);
    });
  });
}

