// main.js

import { StateManager } from './core/stateManager.js';
import { StoryEngine } from './core/storyEngine.js';
import { OutputRenderer } from './core/outputRenderer.js';
import { InputHandler } from './core/inputHandler.js';



async function initGame() {
  // Boot up the state manager (loads from localStorage if present)
  // StateManager.init();
  // Load chapter 1 from Wolves of Langston
  const storyId = "wolves-of-langston";
  const chapterFile = "chapter_1.json";

  const firstScene = await StoryEngine.loadChapter(storyId, chapterFile);

  // Wire up buttons and input
  InputHandler.setup((choiceType) => {
    const nextScene = StoryEngine.advance(choiceType);
    if (nextScene) {
      OutputRenderer.renderScene(nextScene);
    }
  });

  // Start game if already saved (Optional)
  if (StateManager.getPlayerData().name) {
    OutputRenderer.updateStats();
    OutputRenderer.renderScene(firstScene);
  }
}

document.getElementById('game-options-menu').style.display = 'none';
document.getElementById('story-prompts').style.display = 'none';
document.getElementById('stats').style.display = 'none';
document.getElementById('store-modal').style.display = 'none';
document.getElementById('faq-modal').style.display = 'none';

initGame();
