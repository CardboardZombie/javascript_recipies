// StateManager.js
const LOCAL_STORAGE_KEY = "playerData";

export const StateManager = (() => {
  let state = {
    name: "",
    health: 0,
    ac: 0,
    coin: 0,
    inspiration: false,
    currentScene: 0
  };

  function init() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      state = JSON.parse(saved);
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
      currentScene: 0
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
    reset
  };
})();
