let choices;
let game_stats = {
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
        dark_mode: false
    }
};

document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('slider-menu').classList.toggle('menu-open');
});

document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    var skillpointsModal = document.getElementById('skillpoints-modal');
    var playerInfoModal = document.getElementById('player-info-modal');

    // Buttons
    var skillpointsBtn = document.getElementById('menu-btn-skillpoints');
    var menuSaveGameBtn = document.getElementById('menu-save-game-btn');
    var editProfileBtn = document.getElementById('edit-profile-btn');
    var closeBtns = document.getElementsByClassName('close-btn');
    var submitProfileBtn = document.getElementById('submit-profile-btn');

    var newGameBtn = document.getElementById('new-game-btn');

    // Function to open a modal
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    // Function to close a modal
    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            // Clear input fields if the player-info-modal is closed
            if (modalId === 'player-info-modal') {
                document.getElementById('player-name').value = game_stats.player.name || 'Fartknuckle';
                document.getElementById('player-health').value = game_stats.player.health || 0;
                document.getElementById('player-armour').value = game_stats.player.armour_class || 10;
                document.getElementById('player-coin').value = game_stats.player.coin || 0;
                document.getElementById('username-error').style.display = 'none';
                document.getElementById('health-error').style.display = 'none';
                document.getElementById('coin-error').style.display = 'none';
            }
        }
    }

    // Open Skill Points Modal
    skillpointsBtn.addEventListener('click', function() {
        openModal('skillpoints-modal');
    });

    // Open Player Info Modal
    editProfileBtn.addEventListener('click', function() {
        openModal('player-info-modal');
    });

    // Open the player info modal when New Game is clicked
    menuSaveGameBtn.onclick = function() {
        saveGame();
        alert("Game Saved!");
    };

    newGameBtn.onclick = function() {
        openModal('player-info-modal');
    };

    // Close modals when clicking on <span> (x)
    Array.from(closeBtns).forEach(btn => {
        btn.addEventListener('click', function() {
            var parentModal = btn.closest('.modal');
            if (parentModal) {
                closeModal(parentModal.id);
            }
        });
    });

    // Close modals when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Validate and submit player info
    submitProfileBtn.addEventListener('click', function() {
        var name = document.getElementById('player-name').value;
        var health = document.getElementById('player-health').value;
        var coin = document.getElementById('player-coin').value;

        var usernameError = document.getElementById('username-error');
        var healthError = document.getElementById('health-error');
        var coinError = document.getElementById('coin-error');

        // Reset errors
        usernameError.display = 'none';
        healthError.style.display = 'none';
        coinError.style.display = 'none';

        if(health > 50 || coin > 200 || name.length > 50) {
            if(health > 50){
                healthError.style.display = 'inline';
            }
            if (coin > 200) {
                coinError.style.display = 'inline';
            }
            if(name.length > 50){
                usernameError.style.display = 'inline';
            } 
        }
        else{
            // Handle valid data submission
            game_stats.player = {
                name: name,
                health: parseInt(health),
                armour: parseInt(document.getElementById('player-armour').value),
                coin: parseFloat(coin)
            };
            closeModal('player-info-modal');
            // Perform any additional actions, e.g., saving the data
        }
    });
});

// Save the game state to localStorage
function saveGame() {
    localStorage.setItem("gameState", JSON.stringify(game_stats));
    console.log("Game saved!");
}

// Export the game state to a JSON file
function exportGame() {
    const gameData = localStorage.getItem("gameState");
    const blob = new Blob([gameData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${game_stats.player.name}_game_save.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log("Game exported!");
}

// Load a game save file from the user's computer
function importGame(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const importedGameState = JSON.parse(e.target.result);
        localStorage.setItem("gameState", JSON.stringify(importedGameState));
        console.log("Game imported and saved!");
        loadGame(); // Load the imported state into the game
    };

    reader.readAsText(file);
}

// Load the saved game state from localStorage
function loadGame() {
    const savedGame = localStorage.getItem("gameState");

    if (savedGame) {
        game_stats = JSON.parse(savedGame);
        console.log("Game loaded!", game_stats);
        // Update the game with loaded data (e.g., display player stats)
    } else {
        console.log("No saved game found.");
    }
}

document.getElementById('new-game-btn').addEventListener('click', () => {
    // Clear existing game state and start a new game
    localStorage.removeItem('gameState');
    alert('Starting a New Game...');
    // You can reset the game state and update UI here
    game_stats = {
        player: {
            name: "",
            health: 10,
            armour_class: 10,
            coin: 10,
            inventory: ['sword', 'shield'],
            inspiration: false
        },
        settings: {
            chapter: 1,
            choice_number: 0,
            shop: false,
            dark_mode: false
        }
    };
    saveGameState(); // Save the new game state
    updateUI(); // Function to update your UI with the new game stats
});

document.getElementById('load-game-btn').addEventListener('click', () => {
    // Load the game state from localStorage
    const savedGame = localStorage.getItem('gameState');
    if (savedGame) {
        game_stats = JSON.parse(savedGame);
        console.log(game_stats);
        alert(`${game_stats.player.name} Loaded Successfully!`);
        updateUI(); // Function to update your UI with loaded game stats
    } else {
        alert('No saved game found!');
    }
});



// Utility function to update the UI based on game state
function updateUI() {
    document.getElementById('health-value').textContent = game_stats.player.health;
    document.getElementById('coin-value').textContent = game_stats.player.coin;
    // Update other stats as needed
}



