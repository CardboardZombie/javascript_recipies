# 🕹️ Text Adventure Engine

A modular browser-based text adventure framework. Designed for solo play or testing D\&D-style narrative content, with plug-and-play story support.

---

## 📁 Project Structure

```
text-adventure-engine/
├── public/                      # Static assets (e.g. index.html)
├── src/
│   ├── core/                   # Core engine logic
│   │   ├── StateManager.js     # Player data, localStorage handling
│   │   ├── StoryEngine.js      # Scene navigation and chapter loading
│   │   ├── outputRenderer.js   # Scene rendering to the DOM
│   │   └── inputHandler.js     # Event listeners and UI logic
│   ├── modules/                # Optional systems (e.g. combat)
│   ├── stories/                # Story files (modular, JSON-based)
│   │   ├── wolves-of-langston/
│   │   │   ├── chapter_1.json
│   │   │   └── index.json      # Metadata for the story
│   └── main.js                 # Entry point and glue code
├── styles/
│   └── main.css                # UI styling
└── README.md
```

---

## 🚀 How It Works

1. `main.js` initializes the game:

   * Loads player data from localStorage
   * Loads story JSON from the `/stories/` folder
   * Displays the current scene in the DOM

2. The game is fully modular:

   * Scenes are stored in JSON and indexed by ID
   * Game logic (`success`, `failure`, coins, inspiration) is parsed from data
   * Buttons trigger the story engine to load the next scene

3. Player data is saved between sessions using `localStorage`

---

## 🧠 Core Modules

### `StateManager.js`

Handles:

* Player name, health, AC, coin, inspiration
* Saving and loading data
* Resetting for a new game

### `StoryEngine.js`

Handles:

* Chapter loading from story files
* Scene navigation via success/failure paths

### `outputRenderer.js`

Handles:

* Rendering scene text
* Generating choice buttons
* Updating stats UI

### `inputHandler.js`

Handles:

* Menu buttons, profile submission, game start
* Capturing choice input and forwarding it to the engine

---

## 📦 Adding New Stories

1. Create a folder under `src/stories/your-story-name`
2. Add:

   * `index.json` with metadata
   * One or more chapter files (e.g., `chapter_1.json`)
3. Update `main.js` to load the new story

Story JSON format follows this pattern:

```json
{
  "chapter_1": {
    "0": {
      "description": "You enter a quiet village...",
      "success": { "text": "Look around", "next": 1 },
      "failure": { "text": "Leave town", "next": 2 },
      "coin": 5,
      "inspiration": true
    },
    "1": { ... }
  }
}
```

---

## 🧪 Development Tips

* Use browser console to check saved player data (`localStorage.getItem('playerData')`)
* Test story navigation manually via success/failure button clicks
* Add `console.log()` to `main.js`, `StoryEngine`, or `outputRenderer` to debug scene flow

---

## 📌 Future Enhancements

* Chapter unlock progression
* Combat encounters
* Inventory/equipment
* Scene type system (`narrative`, `combat`, `puzzle`, etc.)
* Dynamic story loading from file upload or server

---

## 🧼 License

Open for personal and educational use. Make cool stuff. Share it. Or hoard it. I don't care.


---

Happy coding (or whatever you call this).

— Your benevolent AI overlord
