// inputHandler.js

import { StateManager } from './stateManager.js';
import { StoryEngine } from './storyEngine.js';
import { OutputRenderer } from './outputRenderer.js';
import { Store } from '../modules/store.js';

function bindShopButtons() {
  document.querySelectorAll('.shop-btn').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.getAttribute('data-item');
      const cost = parseFloat(button.getAttribute('data-cost'));
      Store.buyItem(item, cost);
    });
  });
}

export const InputHandler = (() => {
  let choiceCallback = () => {};

  function setup(callback) {
    bindShopButtons();
    choiceCallback = callback;

    // === MAIN MENU FLOW ===
    document.getElementById('start-btn')?.addEventListener('click', () => {
      document.getElementById('main-menu').style.display = 'none';
      document.getElementById('game-options-menu').style.display = 'block';
    });

    document.getElementById('new-game-btn')?.addEventListener('click', () => {
      StateManager.reset();
      document.getElementById('player-info-modal').style.display = 'block';
    });

    document.getElementById('submit-profile-btn')?.addEventListener('click', () => {
      const name = document.getElementById('player-name').value;
      const health = parseInt(document.getElementById('player-health').value, 10);
      const ac = parseInt(document.getElementById('player-armour').value, 10);
      const coin = parseFloat(document.getElementById('player-coin').value);

      // TODO: Add validation later
      StateManager.setPlayerData({ name, health, ac, coin });
      OutputRenderer.updateStats();

      hideAllMenus();
      OutputRenderer.renderScene(StoryEngine.getCurrentScene());
    });

    // === SLIDER MENU TOGGLE ===
    document.getElementById('menu-btn')?.addEventListener('click', () => {
      const menu = document.getElementById('slider-menu');
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // === CLOSE ALL MODALS (X BUTTONS) ===
    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
      });
    });

    // === MODAL BUTTONS ===
    document.getElementById('menu-btn-faqs')?.addEventListener('click', () => {
      document.getElementById('faq-modal').style.display = 'block';
    });

    document.getElementById('menu-btn-skillpoints')?.addEventListener('click', () => {
      document.getElementById('skillpoints-modal').style.display = 'block';
    });

    document.getElementById('settings-btn')?.addEventListener('click', () => {
      document.getElementById('settings-modal').style.display = 'block';
    });

    document.getElementById('shop-btn')?.addEventListener('click', () => {
      document.getElementById('store-modal').style.display = 'block';
    });

    // === DARK MODE TOGGLE ===
    document.getElementById('toggle-dark-mode')?.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });

    // === SAVE/LOAD/DELETE GAME ===
    document.getElementById('menu-save-game-btn')?.addEventListener('click', () => {
      StateManager.save();
      alert('Game saved!');
    });

    document.getElementById('load-game-settings')?.addEventListener('click', () => {
      StateManager.init(); // Re-load from localStorage
      OutputRenderer.updateStats();
      OutputRenderer.renderScene(StoryEngine.getCurrentScene());
    });

    document.getElementById('delete-game')?.addEventListener('click', () => {
      localStorage.removeItem('playerData');
      alert('Game data deleted.');
      location.reload();
    });

    document.getElementById('quit-game')?.addEventListener('click', () => {
      location.reload();
    });
  }

  function hideAllMenus() {
    const ids = [
      'main-menu',
      'game-options-menu',
      'player-info-modal',
      'slider-menu',
      'settings-modal',
      'skillpoints-modal',
      'faq-modal',
      'store-modal',
      'load-game-menu'
    ];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  function handleChoice(type) {
    if (choiceCallback) {
      choiceCallback(type);
    }
  }

  return {
    setup,
    handleChoice
  };
})();

