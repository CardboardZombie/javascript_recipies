export let game_stats = {
    player: {
        name: "",
        health: 0,
        armour_class: 0,
        coin: 0,
        inventory: [],
        inspiration: false
    },
    settings: {
        chapter: 1,
        choice_number: 0,
        shop: false,
        dark_mode: false,
        skillpoints: [false, false, false, false, false]
    }
};

export function loadGame(slot) {
    const save = JSON.parse(localStorage.getItem(`saveSlot${slot}`));
    if (save) {
        game_stats = save.state;
        updateUI(game_stats, choices);
    } else {
        alert('No save data found in this slot.');
    }
}

export function saveGame(slot) {
    const save = {
        player: game_stats.player.name,
        state: game_stats,
        date: new Date().toLocaleString()
    };
    localStorage.setItem(`saveSlot${slot}`, JSON.stringify(save));
}

export function deleteSave(slot) {
    if (localStorage.getItem(`saveSlot${slot}`)) {
        localStorage.removeItem(`saveSlot${slot}`);
        alert(`Slot ${slot}: ${game_stats.player.name} deleted.`);
        updateSaveSlots();
    } else {
        alert(`Save slot ${slot} is already empty.`);
    }
}

export function updateSaveSlots() {
    const saveSlots = document.getElementById('save-slots');
    saveSlots.innerHTML = ''; // Clear existing save slots

    for (let i = 1; i <= 3; i++) {
        const save = JSON.parse(localStorage.getItem(`saveSlot${i}`));
        const slotElement = document.createElement('div');
        slotElement.classList.add('save-slot');
        slotElement.dataset.slot = i;

        if (save) {
            slotElement.innerHTML = `
                <p>Slot ${i}: ${save.player}</p>
                <p>Last saved: ${save.date}</p>
                <button onclick="loadGame(${i})">Load</button>
                <button onclick="deleteSave(${i})">Delete</button>
            `;
        } else {
            slotElement.innerHTML = `
                <p>Slot ${i}: Empty</p>
                <button onclick="saveGame(${i})">Save</button>
            `;
        }

        saveSlots.appendChild(slotElement);
    }
}