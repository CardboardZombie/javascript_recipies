// Initial game state
let gameState = {
    currentRoom: 'living room',
    playerHealth: 100,
    monster: {
        health: 50,
        isAlive: true
    },
    rooms: {
        'living room': {
            description: 'You are in the living room. There is a door to the north.',
            light: 'on'
        },
        'kitchen': {
            description: 'You are in the kitchen. There is a door to the south.',
            light: 'off'
        }
    }
};

// Function to display a message
function displayMessage(message) {
    const output = document.getElementById('output');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight; // Scroll to bottom
}

// Function to display a monster image
function displayMonsterImage() {
    const output = document.getElementById('output');
    const imageElement = document.createElement('img');
    imageElement.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ac32254-5b9e-4edf-87f9-df1e55768d30/d75xefm-226bbf26-8fdf-4823-90bc-8f6492d428b5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYzMyMjU0LTViOWUtNGVkZi04N2Y5LWRmMWU1NTc2OGQzMFwvZDc1eGVmbS0yMjZiYmYyNi04ZmRmLTQ4MjMtOTBiYy04ZjY0OTJkNDI4YjUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hHNmp76bIR3eBl31YSxJcvT1TeY0oC26SuI5TKXXgBs'; // Replace with your monster image URL
    imageElement.alt = 'A monster attacking';
    imageElement.className = 'monster-image';
    output.appendChild(imageElement);
    output.scrollTop = output.scrollHeight; // Scroll to bottom
}

// Function to process player commands
function processCommand(command) {
    command = command.toLowerCase().trim();
    let currentRoom = gameState.rooms[gameState.currentRoom];

    if (command === 'look') {
        displayMessage(currentRoom.description + ` The light is ${currentRoom.light}.`);
    } else if (command === 'turn off light') {
        if (currentRoom.light === 'on') {
            currentRoom.light = 'off';
            displayMessage('You turned off the light.');
            monsterAttacks();
        } else {
            displayMessage('The light is already off.');
        }
    } else if (command === 'turn on light') {
        if (currentRoom.light === 'off') {
            currentRoom.light = 'on';
            displayMessage('You turned on the light.');
        } else {
            displayMessage('The light is already on.');
        }
    } else if (command === 'go north' && gameState.currentRoom === 'living room') {
        gameState.currentRoom = 'kitchen';
        displayMessage('You go north to the kitchen.');
        displayMessage(gameState.rooms['kitchen'].description);
    } else if (command === 'go south' && gameState.currentRoom === 'kitchen') {
        gameState.currentRoom = 'living room';
        displayMessage('You go south to the living room.');
        displayMessage(gameState.rooms['living room'].description);
    } else if (command === 'attack') {
        attackMonster();
    } else {
        displayMessage('I don\'t understand that command.');
    }
}

// Function to handle command submission
function handleCommand() {
    const commandInput = document.getElementById('command');
    const command = commandInput.value;
    if (command.trim()) {
        processCommand(command);
        commandInput.value = ''; // Clear input
    }
}

// Function to toggle theme
function toggleTheme(event) {
    const isChecked = event.target.checked;
    document.body.classList.toggle('dark-mode', isChecked);
    document.getElementById('game-area').classList.toggle('dark-mode', isChecked);
    document.getElementById('output').classList.toggle('dark-mode', isChecked);
}

// Function to handle monster attack
function monsterAttacks() {
    if (gameState.monster.isAlive) {
        gameState.playerHealth -= 10;
        displayMessage('A monster attacks you! You lose 10 health points.');
        displayMonsterImage(); // Display the monster image
        displayMessage(`Your health: ${gameState.playerHealth}`);
        if (gameState.playerHealth <= 0) {
            displayMessage('You have been defeated by the monster.');
        }
    }
}

// Function to attack the monster
function attackMonster() {
    if (gameState.monster.isAlive) {
        gameState.monster.health -= 20;
        displayMessage('You attack the monster! It loses 20 health points.');
        if (gameState.monster.health <= 0) {
            gameState.monster.isAlive = false;
            displayMessage('You have defeated the monster!');
        } else {
            displayMessage(`Monster's health: ${gameState.monster.health}`);
            monsterAttacks();
        }
    } else {
        displayMessage('The monster is already dead.');
    }
}

// Set up event listeners
document.getElementById('submit').addEventListener('click', handleCommand);
document.getElementById('command').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleCommand();
    }
});
document.getElementById('theme-toggle').addEventListener('change', toggleTheme);

// Initialize game
displayMessage(gameState.rooms['living room'].description);
