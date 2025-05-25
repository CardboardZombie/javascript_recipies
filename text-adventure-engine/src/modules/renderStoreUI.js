// renderStoreUI.js

import { storeItems } from './storeData.js';

export function renderGearTab() {
  const gearTab = document.getElementById('gear');
  if (!gearTab) return;

  gearTab.innerHTML = ''; // Clear existing HTML

  storeItems.gear.forEach(item => {
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
    gearTab.appendChild(itemContainer);
  });
}
