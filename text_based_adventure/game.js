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

const choices = {
    400: { 
        description: "",
        success: { next: 27, text: "ChoiceOne" },
        failure: { next: 3, text: "ChoiceTwo" }
    },
    0: { 
        description: "You pick up your pace to put more distance between you and the wilderness in the hope of a soft bed, a hot meal, and some work for an enterprising adventurer. A town as prosperous as Langston looks like a place to do good, earn coin, and achieve glory. Maybe all three at once, so long as you aren't eaten by wolves between here and there. <br><br>Roll a Wisdom (Perception) check. If you get 10 or more, listen to your surroundings. If you get less than 10, continue forwards.",
        success: { next: 23, text: "Listen" },
        failure: { next: 11, text: "Move Up" }
    },
    1: { 
        description: "Your hopes for a meal and friendly conversation are dashed with what you find in the marketplace. More specifically, you're disappointed with what you don't find.<br><br>It's empty, filled only with a mournful hush. Street vendors are closed, windows are shuttered. Lamplighters have still passed through to fill the square with warm pools of light, but everything feels muted under the weight of an oppressive sadness.<br><br>You're looking for someone - anyone - when a solitary figure in a white robe bustles out from a side street, nearly dropping a sheaf of papers. The robe's hood is down, so you can see that it's a young human woman with a light blond hair. Her robes bear sunburst motifs around the neck and collar and a similar symbol made of gold hangs from around her neck. This appears to be a sun cleric.<br><br>Call out to the cleric or follow her down the empty streets",
        success: { next: 27, text: "Call out to Cleric" },
        failure: { next: 3, text: "Follow her" }
    },
    4: { 
        description: "\"Well then, lucky for you I was here,\" he says with a wide grin and a slap on the back hard enough to throw off your balance. He opens his mouth to speak again but nothing comes out until he unleashes a sneeze that makes his beard bristle. You wait for him to regain his composure.<br><br>\"You must be hungry then. Go straight down this road and you'll reach the town of Langston. Find The Pickled Hen and if anyone asks, tell them Roi Sunderhammer sent you.\"<br><br>You stammer out a thank you despite the adrenaline coursing through you.<br><br>\"Think nothing of it. I'm on my way there myself. Funeral you see, doing my druidic duty to the circel of life and all that.\" He guffaws as if he just told a joke. \"But before I do that, I'm going to have a bit of a chat with these naughty pups. they should know better.\"<br><br>Before you have a chance to respond, the dwarf lopes off toward the woods with a surprisingly graceful gait given his stocky build.<br><br>Between the darkness and another night on the road or a hot meal and a soft mattress, it's hardly even a decision to head towards the lights of Langston.",
        success: { next: 1, text: "Go to Langston" },
    },
    11: { 
        description: "You continue down the road, a growing sense of dread in the pit of your stomach. Looking around you, you see nothing in the trees or undergrowth on either side of the road even though you feel like you should.<br><br>You stop walking, pausing to listen to the dark woods around you. Without the sound of your footsteps, you can now hear a low rumbling growl and excited panting coming from around you.<br><br>All around you.<br><br>A large but scruffy wolf pads into the road in front of you, moonlight shining in its grey fur. Half a dozen more of the beasts step into view, sizing you up.<br><br>You're surrounded by a pack of hungry wolves. Your odds aren't good, but at least you can go down fighting.",
        success: { next: 33, text: "Go Down Fighting" },
    },
    23: { 
        description: "You hear something in the woods off to one side and spin in that direction. A pair of golden yellow eyes peers out out of the dark underbrush, soon joined by a second pair.<br><br>Turning around, you see more eyes gathering in the gloom around you. Before you even consider it as an option, a shaggy, dark grey wolf steps out onto the path behind you.<br><br>Hopelessly outnumbered, you can either square up to fight the pack of wolves or sprint for the town",
        success: { next: 33, text: "Fight the Wolves" },
        failure: { next: 40, text: "Sprint for the Town" }
    },
    33: { 
        description: "You square up to defend yourself as the pack of hungry wolves starts to circle, looking for an opening to attack. There are at least ten of them, and something tells you more are waiting in the darkness of the tree.<br><br>It looks like an early end to your adventuring career, but you're determined not to give up without a fight.<br><br>You're just about to unleash your attack and go down fighting when you hear a bellow behing you on the road.<br><br>You turn around to see a bald dwarf dressed in rough-spun clothes and animal hides pointing at you from on top of a rise in the road. Or maybe past you. Moonlight shines off the skin of his head; his face is lit by small balls of fire dancing in the air over his outstretched palms.<br><br>\"Oh no you don\'t!\" he yells before, the flames flaring with his emotions. \"Get back, you lot!\"<br><br>The wolves immediately tuck their tails between their legs and lay their ears down flat. The apparent leader looks at you and whines.<br><br>\"Not a chance,\" the dwarf scoffs. \"Go on now.\"<br><br>The wolves slink quietly back into the woods, and you realize you are still poised to attack. The dwarf doesn't seem to notice as he approaches. He eyes you up and down, the silence between you stretches.<br><br>Until it breaks with a massive sneeze.<br><br>\"Sorry. You all right?\" he asks with a lopsided smile and a sniffle. \"Didn't have a chance to get a piece off you, did they?\"<br><br>You let him know that you're all in one piece and thank him for his intervention.",
        success: { next: 4, text: "Speak with Dwarf" },
    },
    40: { 
        description: "You take off down the road at a full sprint, running towards town as quickly as you can. You doubt it will be quick enough, but it will buy you time to think<br><br>When you dash, the woods to either side of you erupt with hungry wolves that take up the chase. You power through and get up over a rise in the road.<br><br>Then you nearly trip over a dwarf examining some roadside plant in the moonlight. The moonlight is shining off the bald top of his head and playing around the edges of his red beard. He's dressed simply in homespun cloth and animal skins. Your entrance has clearly startled him and he throws his arms out to embrace you.<br><br>\"Hey, hey!\" he cries out. \"Watch yourself, traveler. What's this all about?\"<br><br>Several wolves scramble into view but come to a skittering halt at the sight of the dwarf.<br><br>He wags a finger at them like a stern tutor, and in unison, the beasts whine and turn away. The whole pack slinks off into the woods again.",
        success: { next: 4, text: "Speak with Dwarf" },
    },
    50: { 
        description: "You find a hidden cave.",
        success: { next: 1, text: "Explore the cave" },
        failure: { next: 2, text: "Move on" }
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

function typeWriter(text, element, speed = 50) {
    let i = 0;
    let isTag = false;
    let textBuffer = '';

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);

            if (char === '<') {
                isTag = true;
            }

            if (isTag) {
                textBuffer += char;
                if (char === '>') {
                    isTag = false;
                    element.innerHTML += textBuffer;
                    textBuffer = '';
                }
            } else {
                element.innerHTML += char;
            }

            i++;
            setTimeout(type, isTag ? 0 : speed);
        }
    }

    type();
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

// // Function to handle the initial prompt
// function handleInitialPrompt(choice) {
//     if (choice === 'enter-house') {
//         gameState.currentRoom = 'hallway';
//         displayMessage('You enter the house.');
//         displayMessage(gameState.rooms['hallway'].description);
//     } else if (choice === 'turn-off-light') {
//         gameState.rooms['outside'].light = 'off';
//         gameState.score += 10; // Increase score for turning off light
//         displayMessage('You turned off the porch light.');
//     }

//     document.getElementById('initial-prompt').style.display = 'none';
//     document.getElementById('console').style.display = 'block';
//     document.getElementById('win-prompt').style.display = 'none';
//     updateStats();
// }

function handleChoice(choiceNumber){
    const choice = choices[choiceNumber];
    if (choice) {
        // Update the description
        const descriptionElement = document.querySelector(".prompt-description");
        descriptionElement.innerHTML = '';
        typeWriter(choice.description, descriptionElement);


        // Update the buttons with the next choices
        const successButton = document.getElementById('succession');
        const failureButton = document.getElementById('failure');

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
    } else {
        console.log('No more choices available.');
    }
    updateStats();
}

// Function to display the win prompt
function displayWinPrompt() {
    document.getElementById('console').style.display = 'none';
    document.getElementById('win-prompt').style.display = 'block';
}

// Event listeners for the initial prompt buttons
document.getElementById('succession').addEventListener('click', () => handleInitialPrompt('succession'));
document.getElementById('failure').addEventListener('click', () => handleInitialPrompt('failure'));

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

// Initialize the game with the first choice
handleChoice(0);