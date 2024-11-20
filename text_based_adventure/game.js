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

const mainMenu = document.getElementById('main-menu');
const gameOptions = document.getElementById('game-options-menu');
const loadGameMenu = document.getElementById('load-game-menu');
const gameArea = document.getElementById('story-prompts');
const saveSlots = document.getElementById('save-slots');

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('slider-menu').classList.toggle('menu-open');
});

document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    var skillpointsModal = document.getElementById('skillpoints-modal');
    var playerInfoModal = document.getElementById('player-info-modal');
    var settingsModal = document.getElementById('settings-modal');

    // Buttons
    var skillpointsBtn = document.getElementById('menu-btn-skillpoints');
    var settingsBtn = document.getElementById('settings-btn');
    var editProfileBtn = document.getElementById('edit-profile-btn');
    var closeBtns = document.getElementsByClassName('close-btn');
    var menuSaveGameBtn = document.getElementById('menu-save-game-btn');
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

    settingsBtn.addEventListener('click', function() {
        openModal('settings-modal');
    });

    // Open Player Info Modal
    editProfileBtn.addEventListener('click', function() {
        openModal('player-info-modal');
    });

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

    document.getElementById('quit-game').addEventListener('click', () => {
        game_stats = null;
        hideElement(gameArea);
        hideElement(gameOptions);
        hideElement(loadGameMenu);
        document.getElementById('stats').style.display = 'none';
        showElement(mainMenu);
        closeModal('settings-modal');
    });

    document.getElementById('load-game-settings').addEventListener('click', () => {
        hideElement(gameArea);
        document.getElementById('stats').style.display = 'none';
        hideElement(gameOptions);
        showElement(loadGameMenu);
        closeModal('settings-modal');
        // updateSaveSlots();
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
        var armour = document.getElementById('player-armour').value;

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
            closeModal('player-info-modal');
            // Handle valid data submission
            game_stats.player = {
                    name: name,
                    health: parseInt(health),
                    armour_class: parseInt(armour),
                    coin: parseFloat(coin),
                    inventory: ['sword', 'shield'],
                    inspiration: false
                };
            console.log(game_stats.player);
            updateUI();
            
            // Perform any additional actions, e.g., saving the data
            document.getElementById('stats').style.display = 'flex';
            startGame();
        }
    });
});

function loadGame(slot) {
    const save = JSON.parse(localStorage.getItem(`saveSlot${slot}`));
    
    if (save) {
        console.log(save);

        game_stats = save.state;
        console.log(game_stats.player.name);
        console.log(game_stats.player.health);
        console.log("Game loaded!", game_stats);
        console.log("Get ready to pick up where you left off!");
        updateUI();
        document.getElementById('player-name').value = game_stats.player.name;
        document.getElementById('player-health').value = game_stats.player.health;
        document.getElementById('player-coin').value = game_stats.player.coin;
        document.getElementById('player-armour').value = game_stats.player.armour_class;
        document.getElementById('stats').style.display = 'flex';
        startGame();
    } else {
        alert('No save data found in this slot.');
    }
 }

function saveGame(slot) {
    const save = {
      player: game_stats.player.name,
      state: game_stats,
      date: new Date().toLocaleString()
    };
    localStorage.setItem(`saveSlot${slot}`, JSON.stringify(save));
    alert(`Game saved in slot ${slot}`);
}

// function deleteGame(slot) {
//     localStorage.removeItem(`saveSlot${slot}`);
//     alert(`Save in slot ${slot} deleted`);
//     updateSaveSlots();
// }

function updateSaveSlots() {
    saveSlots.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
     //contains the number of save
      const save = JSON.parse(localStorage.getItem(`saveSlot${i}`));
      const slot = document.createElement('div');
      slot.className = 'control-btn';
      if (save) {
        slot.innerHTML = `Slot ${i}: ${save.player}`;
        slot.onclick = function() {
            loadGame(i);
        };
      } else {
        slot.innerHTML = `Slot ${i}: Empty`;
      }
      saveSlots.appendChild(slot);
    }
}

function startGame() {
    hideElement(mainMenu);
    hideElement(gameOptions);
    hideElement(loadGameMenu);
    showElement(gameArea);
}

document.getElementById('start-btn').addEventListener('click', () => {
    hideElement(mainMenu);
    showElement(gameOptions);
  });



document.getElementById('new-game-btn').addEventListener('click', () => {
    hideElement(gameOptions);
    game_stats.settings = {
            chapter: 1,
            choice_number: 0,
            shop: false,
            dark_mode: false
    };
    
});

document.getElementById('load-game-btn').addEventListener('click', () => {
    hideElement(gameOptions);
    showElement(loadGameMenu);
    updateSaveSlots();
});

document.getElementById('back-btn').addEventListener('click', () => {
    hideElement(gameOptions);
    showElement(mainMenu);
});

document.getElementById('back-to-options').addEventListener('click', () => {
    hideElement(loadGameMenu);
    showElement(gameOptions);
});

// Utility function to update the UI based on game state
function updateUI() {
    document.getElementById('health-value').textContent = game_stats.player.health;
    document.getElementById('coin-value').textContent = game_stats.player.coin;
    document.getElementById('ac-value').textContent = game_stats.player.armour_class;    // Update other stats as needed
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById('menu-save-game-btn').addEventListener('click', () => {
    if (game_stats.player.name && game_stats) {
      for (let i = 1; i <= 3; i++) {
        console.log(i);
        if (!localStorage.getItem(`saveSlot${i}`)) {
          saveGame(i);
          return;
        }
      }
      alert('All save slots are full. Please delete a save to continue.');
    } else {
      alert('No active game to save.');
    }
});
  
// document.getElementById('delete-game').addEventListener('click', () => {
//     if (game_stats.player.name && game_stats) {
//       for (let i = 1; i <= 3; i++) {
//         const save = JSON.parse(localStorage.getItem(`saveSlot${i}`));
//         if (save && save.player.name === game_stats.player.name) {
//           deleteGame(i);
//           return;
//         }
//       }
//       alert('No save found for the current player.');
//     } else {
//       alert('No active game to delete.');
//     }
// });
  
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);
