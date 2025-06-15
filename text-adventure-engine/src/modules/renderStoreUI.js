// renderStoreUI.js

import { Store } from './store.js';

// Tab switching logic
function setupTabSwitching() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });

      const targetId = tab.getAttribute('data-tab');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        target.style.display = 'block';
      }
    });
  });
}

// Shop button logic
function bindShopButtons() {
  document.querySelectorAll('.shop-btn').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.getAttribute('data-item');
      const cost = parseFloat(button.getAttribute('data-cost'));
      Store.buyItem(item, cost);
    });
  });
}

export function renderStore(storeData) {
  const storeModal = document.getElementById('store-modal');
  storeModal.querySelector('h2').textContent = storeData.name || "Shop";

  const tabContainer = storeModal.querySelector('.tabs');
  const oldTabs = tabContainer.querySelectorAll('.tab');
  const oldContents = storeModal.querySelectorAll('.tab-content');

  // Clear existing tabs and content
  oldTabs.forEach(t => t.remove());
  oldContents.forEach(c => c.remove());

  console.log("Loaded store:", storeData.name);
  console.log("Tabs:", Object.keys(storeData.tabs));

  // Create new tab elements and content
  for (const [tabName, items] of Object.entries(storeData.tabs)) {
    
    // Tab header
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.dataset.tab = tabName;
    tab.textContent = tabName;
    tabContainer.appendChild(tab);

    // Tab content
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    tabContent.id = tabName;
    tabContent.style.display = 'none';

    items.forEach(item => {
      console.log(`Adding item: ${item.name}`);
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
      tabContent.appendChild(itemContainer);
    });

    const contentContainer = storeModal.querySelector('.tab-contents');
    if (contentContainer) {
      contentContainer.appendChild(tabContent);
    }
  }

  // Activate first tab
  const firstTab = tabContainer.querySelector('.tab');
  if (firstTab) {
    firstTab.classList.add('active');
    const tabId = firstTab.dataset.tab;
    const firstTabContent = document.getElementById(tabId);
    if (firstTabContent) {
      firstTabContent.classList.add('active');
      firstTabContent.style.display = 'block';
    }
  }

  setupTabSwitching();    // Now DOM is ready
  bindShopButtons();      // Buttons now exist

  storeModal.style.display = 'block'; 
}