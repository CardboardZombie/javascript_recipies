// outputRenderer.js

import { StateManager } from './stateManager.js';

const sceneContainer = document.querySelector('#story-prompts');
const descriptionBox = sceneContainer.querySelector('.prompt-description');
const choiceButtons = sceneContainer.querySelector('.choice-buttons');

export const OutputRenderer = (() => {

  function renderScene(scene) {
    sceneContainer.style.display = 'block';
    descriptionBox.innerHTML = scene.description;
    const storeElem = document.getElementById('store');
    // Clear buttons first
    choiceButtons.innerHTML = '';

    // Render success/failure options
    if (scene.success) {
      const successBtn = document.createElement('button');
      successBtn.className = 'choice-button';
      successBtn.textContent = scene.success.text;
      successBtn.onclick = () => handleChoice('success');
      choiceButtons.appendChild(successBtn);
    }

    if (scene.failure) {
      const failureBtn = document.createElement('button');
      failureBtn.className = 'choice-button';
      failureBtn.textContent = scene.failure.text;
      failureBtn.onclick = () => handleChoice('failure');
      choiceButtons.appendChild(failureBtn);
    }

    // Apply effects (e.g., inspiration, coins)
    if (scene.inspiration) {
      StateManager.toggleInspiration();
    }

    if (scene.coin) {
      StateManager.addCoin(scene.coin);
    }

    if (scene.shop) {
      storeElem.style.display = scene.shop ? 'flex' : 'none';
    }
    // Optional: Render updated stats if needed
    updateStats();
  }

  function updateStats() {
    const { health, ac, coin } = StateManager.getPlayerData();
    document.getElementById('health-value').textContent = health;
    document.getElementById('ac-value').textContent = ac;
    document.getElementById('coin-value').textContent = coin;
  }

  // This will be replaced by InputHandler, but still useful for testing
  let choiceCallback = null;
  function setChoiceCallback(cb) {
    choiceCallback = cb;
  }

  function handleChoice(type) {
    if (choiceCallback) {
      choiceCallback(type);
    }
  }

  return {
    renderScene,
    setChoiceCallback,
    updateStats
  };
})();
