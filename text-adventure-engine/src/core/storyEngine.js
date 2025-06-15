// StoryEngine.js

let storyData = {};
let currentSceneId = 0;

function setSceneId(id) {
  console.log('[STORY ENGINE] Updating scene ID to', id);
  currentSceneId = id;
}


export const StoryEngine = (() => {
  async function loadChapter(storyId, chapterFilename) {
  try {
    const res = await fetch(`/src/stories/${storyId}/${chapterFilename}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const chapterKey = Object.keys(data)[0];
    storyData = data[chapterKey];
    console.log("[STORY ENGINE] Loaded chapter:", chapterKey);
    console.log("[STORY ENGINE] Story data:", storyData);
    currentSceneId = 0;
    return getCurrentScene();
  } catch (err) {
    console.error("Failed to load chapter:", err);
    return null;
  }
}

  function getCurrentScene() {
    return storyData[String(currentSceneId)];
  }

  function goToScene(index) {
    if (storyData.hasOwnProperty(index)) {
      currentSceneIndex = index;
      return storyData[String(currentSceneId)];
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
    return currentSceneId;
  }

  return {
    loadChapter,
    getCurrentScene,
    advance,
    getCurrentSceneIndex,
    setSceneId
  };
})();

