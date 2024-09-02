let choices;
let game_stats = {
    player: {
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

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('game_stats', JSON.stringify(game_stats));
    console.log("Game saved!");
}


// Load game state from localStorage
function loadGame() {
    const savedGame = localStorage.getItem('game_stats');
    if (savedGame) {
        game_stats = JSON.parse(savedGame);
        console.log("Game loaded!", game_stats);
        return true;
    } else {
        console.log("No saved game found.");
        return false;
    }
}


// Function to update the UI based on loaded game state
function updateUI() {
    // Update the score display
    document.getElementById('score-value').innerText = game_stats.player.coin;
    document.getElementById('health-value').innerText = game_stats.player.health;

    // Update the dark mode setting
    document.body.classList.toggle('dark-mode', game_stats.settings.dark_mode);
    document.getElementById('game-area').classList.toggle('dark-mode', game_stats.settings.dark_mode);
    document.getElementById('output').classList.toggle('dark-mode', game_stats.settings.dark_mode);

    // Update chapter title and choices if applicable
    loadStory().then(story => {
        loadChapter(story, game_stats.settings.chapter).then(chapter => {
            choices = chapter;
            document.getElementById('nav-title').innerHTML = chapter["title"];
            handleChoice(game_stats.settings.choice_number);
        }).catch(error => {
            console.error('Failed to load chapter:', error);
        });
    }).catch(error => {
        console.error('Failed to load story:', error);
    });
}


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

function typeWriter(text, element, callback) {
    let i = 0;
    const speed = 25; // Speed in milliseconds

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

            setTimeout(type, speed);
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
    saveGame(); // Save the game state

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
    const inspirationElement = document.querySelector(".inspiration");

    if (choice.inspiration) {
        game_stats.player.inspiration = true;
    }

    if (game_stats.player.inspiration) {
        inspirationElement.style.color = '#4CAF50';
        inspirationElement.style.pointerEvents = 'auto';
        inspirationElement.classList.add('green');

        inspirationElement.onclick = () => {
            inspirationElement.style.color = 'grey';
            inspirationElement.style.pointerEvents = 'none';
            inspirationElement.classList.remove('green');

            game_stats.player.inspiration = false;
        };
    } 
}

function updateScore(choice) {
    if (choice.coin) {
        game_stats.player.coin += choice.coin;
        document.getElementById('score-value').innerText = game_stats.player.coin;
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
    document.getElementById('storeModal').style.display = 'flex';
}

function closeStore() {
    document.getElementById('storeModal').style.display = 'none';
}


// Example of other interactions (e.g., buying an item) to save the state after an action
function buyItem(itemName, cost) {
    const scoreElement = document.getElementById('score-value');
    let currentScore = parseFloat(game_stats.player.coin);
    
    if (currentScore >= cost) {
        alert(`Add ${itemName} to your Inventory!`);
        currentScore -= cost;
        game_stats.player.coin = currentScore.toFixed(2);
        game_stats.player.inventory.push(itemName); // Add item to inventory
    } else {
        alert('Not enough GP to buy this item.');
    }
    scoreElement.textContent = currentScore.toFixed(2);
    saveGame(); // Save game state after purchase
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


document.getElementById('start-btn').addEventListener('click', function() {
    openModal('player-info-modal');
});


// Event listener for the "Load Game" button
document.getElementById('load-btn').addEventListener('click', () => {
    if (loadGame()) {
        document.getElementById('start-game').style.display = 'none';
        document.getElementById('story-prompt').style.display = 'block';
        updateUI();
    } else {
        alert("No saved game found.");
    }
});


// Event listener for the theme toggle switch
document.getElementById('theme-toggle').addEventListener('change', (event) => {
    const isDarkMode = event.target.checked;
    game_stats.settings.dark_mode = isDarkMode; // Update the game state
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('game-area').classList.toggle('dark-mode', isDarkMode);
    document.getElementById('output').classList.toggle('dark-mode', isDarkMode);
    saveGame(); // Save game state when the theme changes
});


// Function to open a modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Function to start the game after player info is submitted
function startGameWithPlayerInfo() {
    const playerName = document.getElementById('player-name').value || 'Unnamed Hero';
    const playerHealth = document.getElementById('player-health').value || 100;
    const playerArmour = document.getElementById('player-armour').value || 10;
    const playerCoin = document.getElementById('player-coin').value || 0;

    // Initialize player stats
    game_stats.player = {
        name: playerName,
        health: parseInt(playerHealth),
        armour: parseInt(playerArmour),
        coin: parseFloat(playerCoin),
        inventory: []
    };

    // Close the modal
    closeModal('player-info-modal');

    // Update UI with player stats
    updatePlayerProfile();
    startGame(); // Start the game with the player's information
}


// Function to update the player's profile in the UI
function updatePlayerProfile() {
    document.getElementById('profile-name').textContent = `Name: ${game_stats.player.name}`;
    document.getElementById('profile-health').textContent = `Health: ${game_stats.player.health}`;
    document.getElementById('profile-armour').textContent = `Armour Class: ${game_stats.player.armour}`;
    document.getElementById('profile-coin').textContent = `Coin: ${game_stats.player.coin} GP`;

    // Display the profile and quit buttons
    document.getElementById('profile-btn').style.display = 'block';
    document.getElementById('quit-game-btn').style.display = 'block';
}

// Function to start the game with the current player's stats
function startGame() {
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('story-prompt').style.display = 'block';

    // Display the initial game story or prompt
    typeWriter('Welcome to the adventure, ' + game_stats.player.name + '. Your journey begins now...', document.querySelector(".prompt-description"));
    document.getElementById('succession').style.display = 'block';

    //Event listener for the "Start Game" button
    document.getElementById('succession').addEventListener('click', () => {
        updateUI();
    });

}



  // Event listener for starting the story after player info is submitted
document.getElementById('start-story-btn').addEventListener('click', function() {
    startGameWithPlayerInfo();
});

// Function to quit the game and return to the main menu
function quitGame() {
    saveGame(); // Save the current game state
    alert('Your game progress has been saved. Returning to the main menu.');

    // Reset game UI
    document.getElementById('player-info-modal').style.display = 'none';
    document.getElementById('load-game-modal').style.display = 'none';
    document.getElementById('start-game').style.display = 'block';
    document.getElementById('story-prompt').style.display = 'none';
    document.getElementById('console').style.display = 'none';

    // Hide profile and quit buttons
    document.getElementById('profile-btn').style.display = 'none';
    document.getElementById('quit-game-btn').style.display = 'none';
}