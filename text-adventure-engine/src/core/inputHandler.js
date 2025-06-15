// inputHandler.js

import { StateManager } from './stateManager.js';
import { StoryEngine } from './storyEngine.js';
import { OutputRenderer } from './outputRenderer.js';
import { stores } from '../modules/storeData.js';
import { renderStore } from '../modules/renderStoreUI.js';

export const InputHandler = (() => {
  let choiceCallback = () => {};

  function setup(callback) {
   
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
      if (!name || isNaN(health) || isNaN(ac) || isNaN(coin)) {
        alert('Please fill out all fields correctly.');
        return;
      }
      // TODO: Add validation later
      StateManager.setPlayerData({ name, health, ac, coin });
      OutputRenderer.updateStats();
      document.getElementById('stats').style.display = 'flex';
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
      const storeWrapper = document.getElementById('store');
      const shopId = storeWrapper?.dataset?.shopId;
      const storeData = stores[shopId];

      if (storeData) {
        renderStore(storeData);
      } else {
        console.warn(`No store data found for ID "${shopId}"`);
      }
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
    const current = StoryEngine.getCurrentScene();
    console.log('[CHOICE]', type);
    console.log('[CURRENT SCENE]', current);

    const nextId = current?.[type]?.next;
    console.log('[NEXT ID]', nextId);

    if (nextId !== undefined && nextId !== null) {
      console.log(`[ADVANCE] Moving to scene: ${nextId}`);
      StateManager.addChoice(type, nextId);
      StoryEngine.setSceneId(nextId);
      OutputRenderer.renderScene(StoryEngine.getCurrentScene());
    } else {
      console.warn(`No valid 'next' scene for type "${type}"`);
    }
  }

  return {
    setup,
    handleChoice
  };
})();

