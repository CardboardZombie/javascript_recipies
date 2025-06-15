// StateManager.js
const LOCAL_STORAGE_KEY = "playerData";

export const StateManager = (() => {
  let state = {
    name: "",
    health: 0,
    ac: 0,
    coin: 0,
    inspiration: false,
    currentScene: 0,
    choices: []
  };

  function init() {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (saved) {
      state = saved;
    }
  }

  function setPlayerData({ name, health, ac, coin }) {
    state.name = name;
    state.health = health;
    state.ac = ac;
    state.coin = coin;
    save();
  }

  function getPlayerData() {
    return { ...state };
  }

  function updateStat(key, value) {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      save();
    }
  }

  function getStat(key) {
    return state[key];
  }

  function addCoin(amount) {
    state.coin = Math.round((state.coin + amount) * 100) / 100; // Round to 2 decimal places
    if (state.coin < 0) {
      state.coin = 0; // Prevent negative coins
    }
    save();
  }

  function addChoice(choiceType, nextId) {
    state.choices.push({ choice: choiceType, scene: nextId });
    save(); // re-save to localStorage
  }

  function toggleInspiration() {
    state.inspiration = !state.inspiration;
    save();
  }

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }

  function reset() {
    state = {
      name: "",
      health: 0,
      ac: 0,
      coin: 0,
      inspiration: false,
      currentScene: 0,
      choices: []
    };
    save();
  }

  return {
    init,
    setPlayerData,
    getPlayerData,
    updateStat,
    getStat,
    addCoin,
    toggleInspiration,
    save,
    reset,
    addChoice
  };
})();
