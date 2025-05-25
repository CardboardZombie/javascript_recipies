// StoryEngine.js

let storyData = {};
let currentSceneIndex = 0;

export const StoryEngine = (() => {
  async function loadChapter(storyId, chapterFilename) {
  try {
    const res = await fetch(`/src/stories/${storyId}/${chapterFilename}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const chapterKey = Object.keys(data)[0];
    storyData = data[chapterKey];
    currentSceneIndex = 0;
    return getCurrentScene();
  } catch (err) {
    console.error("Failed to load chapter:", err);
    return null;
  }
}

  function getCurrentScene() {
    return storyData[currentSceneIndex];
  }

  function goToScene(index) {
    if (storyData.hasOwnProperty(index)) {
      currentSceneIndex = index;
      return storyData[currentSceneIndex];
    }
    return null;
  }

  function advance(choiceType) {
    const scene = getCurrentScene();
    const next = scene[choiceType]?.next;
    if (next !== undefined) {
      return goToScene(next);
    }
    return null;
  }

  function getCurrentSceneIndex() {
    return currentSceneIndex;
  }

  return {
    loadChapter,
    getCurrentScene,
    advance,
    getCurrentSceneIndex
  };
})();

