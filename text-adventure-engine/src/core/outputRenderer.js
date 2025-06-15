// outputRenderer.js

import { StateManager } from './stateManager.js';
import { stores } from '../modules/storeData.js';
import { renderStore } from '../modules/renderStoreUI.js';
import { InputHandler } from './inputHandler.js';

const sceneContainer = document.querySelector('#story-prompts');
const descriptionBox = sceneContainer.querySelector('.prompt-description');
const choiceButtons = sceneContainer.querySelector('.choice-buttons');

export const OutputRenderer = (() => {

  function renderScene(scene) {

    if (!scene || !scene.description) {
      console.error('Invalid scene data:', scene);
      return;
    }
    sceneContainer.style.display = 'block';
    const description = document.querySelector('.prompt-description');
    if (description) {
      const formatted = scene.description;
      typewriterEffect(description, formatted, 20); // 20ms per char
    }

    const choiceButtons = document.querySelector('.choice-buttons');
    choiceButtons.innerHTML = ''; // Clear previous buttons

    if (scene.success) {
      const successBtn = document.createElement('button');
      successBtn.className = 'choice-button';
      successBtn.textContent = scene.success.text;
      successBtn.addEventListener('click', () => {
        InputHandler.handleChoice('success');
      });
      choiceButtons.appendChild(successBtn);
    }

    if (scene.failure) {
      const failureBtn = document.createElement('button');
      failureBtn.className = 'choice-button';
      failureBtn.textContent = scene.failure.text;
      failureBtn.addEventListener('click', () => {
        InputHandler.handleChoice('failure');
      });
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
      // Enable shop icon
      const shopElement = document.getElementById('store');
      if (shopElement) {
        shopElement.style.display = 'flex'; // ✅ Don't forget this is a flex item
        shopElement.dataset.shopId = scene.shop; // store the shop ID for later
      }
    } else {
      const shopElement = document.getElementById('store');
      if (shopElement) {
        shopElement.style.display = 'none';
        shopElement.removeAttribute('data-shop-id');
      }
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


function typewriterEffect(element, html, delay = 20) {
  element.innerHTML = ''; // Clear content

  const parser = new DOMParser();
  const parsed = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const nodes = Array.from(parsed.body.firstChild.childNodes);

  let currentNodeIndex = 0;
  let currentTextIndex = 0;
  let activeNode = null;

  const typeNext = () => {
    if (!activeNode) {
      if (currentNodeIndex >= nodes.length) return; // Done
      activeNode = nodes[currentNodeIndex++];
      if (activeNode.nodeType === Node.ELEMENT_NODE) {
        const newEl = document.createElement(activeNode.nodeName);
        Array.from(activeNode.attributes).forEach(attr => {
          newEl.setAttribute(attr.name, attr.value);
        });
        element.appendChild(newEl);
        activeNode = {
          wrapper: newEl,
          text: activeNode.textContent,
          index: 0
        };
      } else if (activeNode.nodeType === Node.TEXT_NODE) {
        activeNode = {
          wrapper: element,
          text: activeNode.textContent,
          index: 0
        };
      } else {
        activeNode = null;
        return typeNext(); // skip non-text nodes
      }
    }

    const nextChar = activeNode.text.charAt(activeNode.index++);
    activeNode.wrapper.innerHTML += nextChar;

    if (activeNode.index >= activeNode.text.length) {
      activeNode = null;
    }

    setTimeout(typeNext, delay);
  };

  typeNext();
}