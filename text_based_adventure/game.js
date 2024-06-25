// Initial game state
let gameState = {
    currentRoom: 'outside',
    playerHealth: 100,
    score: 0,
    monster: {
        health: 50,
        isAlive: true
    },
    rooms: {
        'outside': {
            description: 'You are outside. There is a door to the north.',
            light: 'on',
            monster: ''
        },
        'hallway': {
            description: 'You are in the hallway. There are two doors to the west, one to the east.',
            light: 'on',
            monster: ''
        },
        'living room': {
            description: 'You are in the living room. There is a door to the east.',
            light: 'on',
            monster: ''
        },
        'kitchen': {
            description: 'You are in the kitchen. There is a door to the west.',
            light: 'off',
            monster: ''
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

// Function to update stats
function updateStats() {
    document.getElementById('health').textContent = gameState.playerHealth;
    document.getElementById('score').textContent = gameState.score;

     // Check for winning condition
     if (gameState.score >= 30) {
        displayWinPrompt();
    }
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
            gameState.score += 10; // Increase score for turning off light
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
    } else if (command === 'go north' && gameState.currentRoom === 'outside') {
        gameState.currentRoom = 'hallway';
        displayMessage('You go north and enter the house.');
        displayMessage(gameState.rooms['hallway'].description);
    } else if (command === 'go west' && gameState.currentRoom === 'hallway') {
        gameState.currentRoom = 'living room';
        displayMessage('You go west to the first door, the living room.');
        displayMessage(gameState.rooms['living room'].description);
    } else if (command === 'go east' && gameState.currentRoom === 'living room') {
        gameState.currentRoom = 'hallway';
        displayMessage('You go east to the hallway.');
        displayMessage(gameState.rooms['hallway'].description);
    } else if (command === 'go east' && gameState.currentRoom === 'hallway') {
        gameState.currentRoom = 'kitchen';
        displayMessage('You go east to the kitchen.');
        displayMessage(gameState.rooms['kitchen'].description);
    } else if (command === 'go west' && gameState.currentRoom === 'kitchen') {
        gameState.currentRoom = 'hallway';
        displayMessage('You go west to the hallway.');
        displayMessage(gameState.rooms['hallway'].description);
    } else if (command === 'go south' && gameState.currentRoom === 'hallway') {
        gameState.currentRoom = 'outside';
        displayMessage('You go south, back outside the house.');
        displayMessage(gameState.rooms['outside'].description);
    } else if (command === 'attack') {
        attackMonster();
    } else {
        displayMessage('I don\'t understand that command.');
    }

    updateStats();
}

// Function to handle the initial prompt
function handleInitialPrompt(choice) {
    if (choice === 'enter-house') {
        gameState.currentRoom = 'hallway';
        displayMessage('You enter the house.');
        displayMessage(gameState.rooms['hallway'].description);
    } else if (choice === 'turn-off-light') {
        gameState.rooms['outside'].light = 'off';
        gameState.score += 10; // Increase score for turning off light
        displayMessage('You turned off the porch light.');
    }

    document.getElementById('initial-prompt').style.display = 'none';
    document.getElementById('console').style.display = 'block';
    document.getElementById('win-prompt').style.display = 'none';
    updateStats();
}

// Function to display the win prompt
function displayWinPrompt() {
    document.getElementById('console').style.display = 'none';
    document.getElementById('win-prompt').style.display = 'block';
}

// Event listeners for the initial prompt buttons
document.getElementById('enter-house').addEventListener('click', () => handleInitialPrompt('enter-house'));
document.getElementById('turn-off-light').addEventListener('click', () => handleInitialPrompt('turn-off-light'));

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', () => {
    const commandInput = document.getElementById('command');
    const command = commandInput.value;
    commandInput.value = '';
    processCommand(command);
});
document.getElementById('command').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const commandInput = document.getElementById('command');
        const command = commandInput.value;
        commandInput.value = '';
        processCommand(command);
    }
});

// Function to handle monster attack
function monsterAttacks() {
    if (gameState.monster.isAlive) {
        gameState.playerHealth -= 10;
        displayMessage('A monster attacks you! You lose 10 health points.');
        displayMonsterImage(); // Display the monster image
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
            gameState.score += 10; // Increase score for defeating the monster
        } else {
            displayMessage(`Monster's health: ${gameState.monster.health}`);
            monsterAttacks();
        }
    } else {
        displayMessage('The monster is already dead.');
    }
}

// Event listener for the theme toggle switch
document.getElementById('theme-toggle').addEventListener('change', (event) => {
    document.body.classList.toggle('dark-mode', event.target.checked);
    document.getElementById('game-area').classList.toggle('dark-mode', event.target.checked);
    document.getElementById('output').classList.toggle('dark-mode', event.target.checked);
});

// Event listeners for the win prompt buttons
document.getElementById('play-more').addEventListener('click', () => {
    document.getElementById('win-prompt').style.display = 'none';
    document.getElementById('console').style.display = 'block';
    gameState.score = 0;
    gameState.playerHealth = 100;
    gameState.currentRoom = 'outside';
    displayMessage('You find yourself in front of an abandoned house with the porch light on. What do you do?');
    updateStats();
});
document.getElementById('thumbs-up').addEventListener('click', () => {
    alert('Thank you for playing!');
});
