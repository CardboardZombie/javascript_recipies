// import { showElement, hideElement, openModal, closeModal, updateUI } from './ui.js';
// import { game_stats, loadGame, saveGame, deleteSave } from './game_state.js';
// import { setupEventListeners } from './event_listeners.js';
// import { typeWriter, toggleDarkMode, setDarkMode } from './utils.js';

// let choices;
// let timeoutId = null;
// let currentSaveSlot = null;

// const mainMenu = document.getElementById('main-menu');
// const gameOptions = document.getElementById('game-options-menu');
// const loadGameMenu = document.getElementById('load-game-menu');
// const gameArea = document.getElementById('story-prompts');
// const saveSlots = document.getElementById('save-slots');

// setupEventListeners();

// document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

// function startGame() {
//     hideElement(mainMenu);
//     showElement(gameArea);
//     updateUI(game_stats, choices);
// }

// // Make functions accessible in the global scope if needed
// window.startGame = startGame;
// window.loadGame = loadGame;
// window.saveGame = saveGame;
// window.deleteSave = deleteSave;
// window.updateSaveSlots = updateSaveSlots;

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
        dark_mode: false,
        skillpoints: [false, false, false, false, false]
    }
};
let timeoutId = null;
let currentSaveSlot = null;

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

function closeMenuSlider(){
    document.getElementById('slider-menu').classList.remove('menu-open'); // Disable dark mode
}

document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('slider-menu').classList.toggle('menu-open');
});

document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    // Buttons
    var skillpointsBtn = document.getElementById('menu-btn-skillpoints');
    var faqBtn = document.getElementById('menu-btn-faqs');
    var settingsBtn = document.getElementById('settings-btn');
    var editProfileBtn = document.getElementById('edit-profile-btn');
    var closeBtns = document.getElementsByClassName('close-btn');
    var submitProfileBtn = document.getElementById('submit-profile-btn');
    var howToBtn = document.getElementById('how-to-play-btn');
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
                document.getElementById('ac-error').style.display = 'none';

                console.log(`Stats View ${document.getElementById('stats').style.display}`)
                if(document.getElementById('stats').style.display == 'none'){
                    showElement(gameOptions);
                }
            }
            if(modalId === 'skillpoints-modal' && game_stats.player.name){
                for(var i = 0; i < 5; i++){
                    const checkbox = document.getElementById(`objective${i+1}`);
                    if (checkbox.checked) {
                        game_stats.settings.skillpoints[i] = true;
                    }
                }
            }
        }
    }

    howToBtn.addEventListener('click', function(){
        openModal('faq-modal');
    });

    // Open Skill Points Modal
    skillpointsBtn.addEventListener('click', function() {
        openModal('skillpoints-modal');
    });

    faqBtn.addEventListener('click', function() {
        openModal('faq-modal');
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
        document.getElementById('nav-title').innerHTML = 'The Wolves of Langston';
        document.getElementById('player-title').innerHTML = 'Be the hero Langston needs.';
        document.getElementById('player-health').value = '';
        document.getElementById('player-armour').value = '';
        document.getElementById('player-coin').value = '';
        document.getElementById('player-name').value = '';

        for(var i = 1; i < 6; i++){
            const checkbox = document.getElementById(`objective${i}`);
            if (checkbox) {
                checkbox.checked = false; // Uncheck the checkbox
                console.log("Checkbox has been reset.");
            }
        }
    });

    document.getElementById('load-game-settings').addEventListener('click', () => {
        hideElement(gameArea);
        hideElement(mainMenu);
        document.getElementById('stats').style.display = 'none';
        hideElement(gameOptions);
        showElement(loadGameMenu);
        closeModal('settings-modal');
        updateSaveSlots();
    });

    // Close modals when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
        if (event.target.id !== 'menu-btn' && event.target.classList.contains('toggle-dark-mode') === false) {
            closeMenuSlider();
        }
        console.log(`closed ${event.target.id}`);
        
    });

    // Validate and submit player info
    submitProfileBtn.addEventListener('click', function() {
        var name = document.getElementById('player-name').value;
        var health = document.getElementById('player-health').value;
        var coin = document.getElementById('player-coin').value;
        var armour = document.getElementById('player-armour').value;

        var usernameError = document.getElementById('username-error');
        var healthError = document.getElementById('health-error');
        var armourError = document.getElementById('ac-error');
        var coinError = document.getElementById('coin-error');

        // Reset errors
        usernameError.display = 'none';
        armourError.display = 'none';
        healthError.style.display = 'none';
        coinError.style.display = 'none';
        console.log(health);
        console.log(name);
        console.log(armour);
        if(health > 50 || armour > 20 || coin > 200 || name.length > 50) {
            if(health > 50){
                healthError.style.display = 'inline';
            }
            if(armour > 20){
                armourError.style.display = 'inline';
            }
            if (coin > 200) {
                coinError.style.display = 'inline';
            }
            if(name.length > 50){
                usernameError.style.display = 'inline';
            } 
        }
        else if(health == '' || armour == '' || coin == '' || name == ''){
            if(health == null){
                healthError.style.display = 'inline';
            }
            if(armour == null){
                armourError.style.display = 'inline';
            }
            if (coin == null) {
                coinError.style.display = 'inline';
            }
            if(name == null){
                usernameError.style.display = 'inline';
            } 
        }
        else{
            closeModal('player-info-modal');
            // Handle valid data submission
            console.log(game_stats.player);
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

async function loadStory() {
    try {
        let response = await fetch('story.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let story = await response.json();
        return story;
    } catch (error) {
        console.error('Failed to load story:', error);
    }
    }
    
async function loadChapter(story, chapterNumber) {
    let chapterKey = `chapter_${chapterNumber}`;
    console.log(chapterKey);
    let chapter = story[chapterKey];
    if (!chapter) {
        console.error('Chapter not found:', chapterNumber);
        return null;
    }
    return chapter;
}

function loadGame(slot) {
    const save = JSON.parse(localStorage.getItem(`saveSlot${slot}`));
    
    if (save) {
        console.log(save);

        game_stats = save.state;
        console.log(game_stats.player.name);
        console.log(game_stats.settings);
        console.log("Game loaded!", game_stats);
        console.log("Get ready to pick up where you left off!");
        updateUI();
        document.getElementById('player-name').value = game_stats.player.name;
        document.getElementById('player-health').value = game_stats.player.health;
        document.getElementById('player-coin').value = game_stats.player.coin.toFixed(2);
        document.getElementById('player-armour').value = game_stats.player.armour_class;
        document.getElementById('stats').style.display = 'flex';

        for(var i = 0; i< 5; i++){
            const checkbox = document.getElementById(`objective${i+1}`);
            if (game_stats.settings.skillpoints[i]) {
                checkbox.checked = true; 
                console.log("Skillpoints have been loaded.");
            }
        }

        setDarkMode(game_stats.settings.dark_mode);

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
}

function updateSaveSlots() {
    saveSlots.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
     //contains the number of save
      const save = JSON.parse(localStorage.getItem(`saveSlot${i}`));
      const slot = document.createElement('div');
      slot.id = `save-slot-${i}`;
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

document.getElementById('menu-save-game-btn').addEventListener('click', () => {
    if (game_stats.player.name && game_stats) {
        // Check for an existing save with the same player name
        for (let i = 1; i <= 3; i++) {
            const savedData = localStorage.getItem(`saveSlot${i}`);
            if (savedData) {
                const save = JSON.parse(savedData);
                if (save.player === game_stats.player.name) {
                    saveGame(i); // Overwrite the slot
                    alert(`Slot ${i}: ${game_stats.player.name} updated.`);
                    return;
                }
            }
        }

        // Check for an open slot if no matching player name was found
        for (let i = 1; i <= 3; i++) {
            if (!localStorage.getItem(`saveSlot${i}`)) {
                saveGame(i); // Use the first available slot
                alert(`Slot ${i}: ${game_stats.player.name} created.`);
                return;
            }
        }

        // If no slots are free and no matches were found, alert the user
        alert('All save slots are full. Please delete a save to continue.');
    } else {
        alert('No active game to save.');
    }
});

function deleteSave(slot) {
    if (localStorage.getItem(`saveSlot${slot}`)) {
        localStorage.removeItem(`saveSlot${slot}`);
        document.getElementById(`save-slot-${slot}`).innerHTML = `Slot ${slot}: Empty`;
        alert(`Slot ${slot}: ${game_stats.player.name} deleted.`);
        updateSaveSlots();
    } else {
        alert(`Save slot ${slot} is already empty.`);
    }
}

document.getElementById('delete-game').addEventListener('click', () => {
    if (game_stats.player.name) {
        let saveFound = false;

        // Loop through all save slots to find a match by player name
        for (let i = 1; i <= 3; i++) {
            const savedData = localStorage.getItem(`saveSlot${i}`);
            if (savedData) {
                const save = JSON.parse(savedData);

                // Check if the player name matches the current player's name
                if (save.player === game_stats.player.name) {
                    localStorage.removeItem(`saveSlot${i}`);
                    alert(`Save for player "${game_stats.player.name}" deleted from slot ${i}.`);
                    saveFound = true;
                    break; // Exit the loop after deletion
                }
            }
        }

        // Notify if no matching save was found
        if (!saveFound) {
            alert(`No save found for player "${game_stats.player.name}".`);
        }
    } else {
        alert('No active player to delete a save for.');
    }
});



// Function to display a message
function displayMessage(message) {
    const output = document.getElementById('output');
    const messageElement = document.createElement('div');
    output.appendChild(messageElement);

    typeWriter(message, messageElement, () => {
        output.scrollTop = output.scrollHeight; // Scroll to bottom
    });
    
}

function handleChoice(choiceNumber){
    const choice = choices[choiceNumber];
    if (choice) {
        // Disable buttons during typewriter effect
        const successButton = document.getElementById('succession');
        const failureButton = document.getElementById('failure');
        successButton.disabled = true;
        failureButton.disabled = true;

        // Update the description with typewriter effect
        const descriptionElement = document.querySelector(".prompt-description");
        descriptionElement.innerHTML = ''; // Clear the element's content before starting
        successButton.style.display = 'none';
        failureButton.style.display = 'none';
        typeWriter(choice.description, descriptionElement, () => {
            const isSingleChoice = choice.success.next === choice.failure?.next || !choice.failure;
            if (isSingleChoice) {
                // Transition to console mode after the button is pressed
                successButton.disabled = false;
                successButton.innerText = choice.success.text;
                successButton.style.display = 'inline-block';
                successButton.onclick = () => {
                    // Hide choice buttons and prompt window
                    document.getElementById('succession').style.display = 'none';
                    document.getElementById('failure').style.display = 'none';
                    document.querySelector('.prompt-description').style.display = 'none';

                    // Transition to console mode
                    transitionToConsoleMode(choice.success.next);
                };

                // Hide the failure button if it's not used
                failureButton.style.display = 'none';
            } else {
                // Enable buttons after typewriter effect is done
                successButton.disabled = false;
                failureButton.disabled = false;

                // Update the buttons with the next choices
                successButton.innerText = choice.success.text;
                successButton.style.display = 'inline-block'; // Ensure the button is visible
                successButton.onclick = () => handleChoice(choice.success.next);

                if (choice.failure) {
                    failureButton.innerText = choice.failure.text;
                    failureButton.style.display = 'inline-block'; // Ensure the button is visible
                    failureButton.onclick = () => handleChoice(choice.failure.next);
                } else {
                    failureButton.style.display = 'none'; // Hide the button if no failure option
                }
            }
        });
    } else {
        console.log('No more choices available.');
    }
    //updateStats();
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
    game_stats = {
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
    document.getElementById('coin-value').textContent = game_stats.player.coin.toFixed(2);
    document.getElementById('ac-value').textContent = game_stats.player.armour_class;    // Update other stats as needed
// Update chapter title and choices if applicable
loadStory().then(story => {
    loadChapter(story, game_stats.settings.chapter).then(chapter => {
        choices = chapter;
        document.getElementById('nav-title').innerHTML = chapter["title"];
        document.getElementById('player-title').innerHTML = game_stats.player.name;
        handleChoice(game_stats.settings.choice_number);
    }).catch(error => {
        console.error('Failed to load chapter:', error);
    });
}).catch(error => {
    console.error('Failed to load story:', error);
});
}

function typeWriter(text, element, callback) {

    // Clear the previous timeout if it exists
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
    }

    let i = 0;
    const speed = 25; // Speed in milliseconds
    element.innerHTML = ""; // Clear any previous content before typing new text

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                const endIndex = text.indexOf('>', i);
                if (endIndex !== -1) {
                    const tag = text.substring(i, endIndex + 1);
                    element.innerHTML += tag;
                    i = endIndex + 1;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }

            timeoutId = setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

function handleChoice(choiceNumber){
const choice = choices[choiceNumber];

if (!choice) {
    console.log('No more choices available...');
    return;
}

disableButtons();
clearDescription();
handleInspiration(choice);
updateScore(choice);
updateStore(choice);

game_stats.settings.choice_number = choiceNumber; // Save the current choice
//saveGame(); // Save the game state

typeWriter(choice.description, document.querySelector(".prompt-description"), () => {
    setTimeout(() => {
        enableButtons();
        updateButtons(choice);
    }, 500);
});
}

function disableButtons(){
console.log('Disabling buttons');
const successButton = document.getElementById('succession');
const failureButton = document.getElementById('failure');

successButton.disabled = true;
failureButton.disabled = true;

successButton.style.display = 'none';
failureButton.style.display = 'none';
}

function enableButtons(){
console.log('Enabling buttons');
const successButton = document.getElementById('succession');
const failureButton = document.getElementById('failure');

successButton.disabled = false;
failureButton.disabled = false;

successButton.style.display = 'inline-block';
failureButton.style.display = 'inline-block';
}

function updateButtons(choice) {
const successButton = document.getElementById('succession');
const failureButton = document.getElementById('failure');

successButton.innerText = choice.success.text;
successButton.style.display = 'inline-block';
successButton.onclick = () => handleChoice(choice.success.next);

if (choice.failure) {
    failureButton.innerText = choice.failure.text;
    failureButton.style.display = 'inline-block';
    failureButton.onclick = () => handleChoice(choice.failure.next);
} else {
    failureButton.style.display = 'none';
}
}

function clearDescription() {
const descriptionElement = document.querySelector(".prompt-description");
descriptionElement.innerHTML = '';
}

function handleInspiration(choice) {
    const inspirationElement = document.querySelector(".inspiration-symbol");

    if (choice.inspiration) {
        game_stats.player.inspiration = true;
    }

    if (game_stats.player.inspiration) {
        inspirationElement.style.color = '#6D9C6F';
        inspirationElement.style.pointerEvents = 'auto';
        inspirationElement.style.animation= 'bounce 2s infinite 2s';

        inspirationElement.onclick = () => {
            const userConfirmed = confirm("Are you sure you want to use Inspiration?\n(This is a single-use advantage to your current roll)");
            if (userConfirmed) {
                // User clicked "OK"
                inspirationElement.style.color = 'grey';
                inspirationElement.style.pointerEvents = 'none';
                inspirationElement.style.animation= 'none';
                game_stats.player.inspiration = false;
            }
        };
    } 
}

function updateScore(choice) {
    if (choice.coin) {
        game_stats.player.coin += choice.coin;
        document.getElementById('coin-value').innerText = game_stats.player.coin.toFixed(2);
    }
}

function updateStore(choice){
    if(choice.shop){
        game_stats.settings.shop = true;
        document.getElementById('store').style.display = 'block'; 
    }else{
        game_stats.settings.shop = false;
        document.getElementById('store').style.display = 'none'; 
    }
    console.log(game_stats);
}

function openStore() {
    document.getElementById('store-modal').style.display = 'flex';
}

function closeStore() {
    document.getElementById('store-modal').style.display = 'none';
}
// Example of other interactions (e.g., buying an item) to save the state after an action
function buyItem(itemName, cost) {
    const scoreElement = document.getElementById('coin-value');
    let currentScore = game_stats.player.coin;
    
    if (currentScore >= cost) {
        alert(`Add ${itemName} to your Inventory!`);
        currentScore -= cost;
        game_stats.player.coin = currentScore.toFixed(2);
        game_stats.player.inventory.push(itemName); // Add item to inventory
    } else {
        alert('Not enough GP to buy this item.');
    }
    scoreElement.textContent = game_stats.player.coin;
    console.log(game_stats.player.inventory);
    console.log(game_stats.player.coin);
    //saveGame(); // Save game state after purchase
}

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(this.getAttribute('data-tab')).classList.add('active');
    });
});


function toggleDarkMode() {
    // Toggle the dark-mode class on the body
    const isDarkMode = document.body.classList.toggle('dark-mode');
    // Update the game state
    if(game_stats){
        game_stats.settings.dark_mode = isDarkMode;
    }
    console.log(`Dark mode is now ${isDarkMode ? 'enabled' : 'disabled'}.`);
}

function setDarkMode(enable){
    if (enable) {
        document.body.classList.add('dark-mode'); // Enable dark mode
    } else {
        document.body.classList.remove('dark-mode'); // Disable dark mode
    }
}
  
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);
