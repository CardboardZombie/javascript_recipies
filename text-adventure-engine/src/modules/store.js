// store.js

import { StateManager } from '../core/stateManager.js';
import { OutputRenderer } from '../core/outputRenderer.js';

export const Store = (() => {
  function buyItem(itemName, cost) {
    const player = StateManager.getPlayerData();

    if (player.coin < cost) {
      alert(`You can't afford ${itemName}.`);
      return false;
    }

    // Deduct cost and save state
    StateManager.addCoin(-cost);

    // Optional: log item purchase (future inventory system)
    console.log(`Purchased: ${itemName} for ${cost}gp`);

    // Update UI coin counter
    OutputRenderer.updateStats();

    return true;
  }

  return {
    buyItem
  };
})();
