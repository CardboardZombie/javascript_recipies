/**
 * First Draft: Tadhg Deeney
 * Date 2024-06-01
 */

// Initial game state
let gameState = {
    currentRoom: 'hallway',
    playerHealth: 100,
    score: 0,
    monster: {
        health: 50,
        isAlive: true
    },
    rooms: {
        33: {
            description: "You square up to defend yourself as the pack of hungry wolves starts to circle, looking for an opening to attack. There are at least ten of them, and something tells you more are waiting in the darkness of the tree.<br><br>It looks like an early end to your adventuring career, but you're determined not to give up without a fight.<br><br>You're just about to unleash your attack and go down fighting when you hear a bellow behind you on the road.<br><br>You turn around to see a bald dwarf dressed in rough-spun clothes and animal hides pointing at you from on top of a rise in the road. Or maybe past you. Moonlight shines off the skin of his head; his face is lit by small balls of fire dancing in the air over his outstretched palms.<br><br>\"Oh no you don\'t!\" he yells before, the flames flaring with his emotions. \"Get back, you lot!\"<br><br>The wolves immediately tuck their tails between their legs and lay their ears down flat. The apparent leader looks at you and whines.<br><br>\"Not a chance,\" the dwarf scoffs. \"Go on now.\"<br><br>The wolves slink quietly back into the woods, and you realize you are still poised to attack. The dwarf doesn't seem to notice as he approaches. He eyes you up and down, the silence between you stretches.<br><br>Until it breaks with a massive sneeze.<br><br>\"Sorry. You all right?\" he asks with a lopsided smile and a sniffle. \"Didn't have a chance to get a piece off you, did they?\"<br><br>You let him know that you're all in one piece and thank him for his intervention.",
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

const choices_var = {
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
        description: "\"Well then, lucky for you I was here,\" he says with a wide grin and a slap on the back hard enough to throw off your balance. He opens his mouth to speak again but nothing comes out until he unleashes a sneeze that makes his beard bristle. You wait for him to regain his composure.<br><br>\"You must be hungry then. Go straight down this road and you'll reach the town of Langston. Find The Pickled Hen and if anyone asks, tell them Roi Sunderhammer sent you.\"<br><br>You stammer out a thank you despite the adrenaline coursing through you.<br><br>\"Think nothing of it. I'm on my way there myself. Funeral you see, doing my druidic duty to the circle of life and all that.\" He guffaws as if he just told a joke. \"But before I do that, I'm going to have a bit of a chat with these naughty pups. they should know better.\"<br><br>Before you have a chance to respond, the dwarf lopes off toward the woods with a surprisingly graceful gait given his stocky build.<br><br>Between the darkness and another night on the road or a hot meal and a soft mattress, it's hardly even a decision to head towards the lights of Langston.",
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
        description: "You square up to defend yourself as the pack of hungry wolves starts to circle, looking for an opening to attack. There are at least ten of them, and something tells you more are waiting in the darkness of the tree.<br><br>It looks like an early end to your adventuring career, but you're determined not to give up without a fight.<br><br>You're just about to unleash your attack and go down fighting when you hear a bellow behind you on the road.<br><br>You turn around to see a bald dwarf dressed in rough-spun clothes and animal hides pointing at you from on top of a rise in the road. Or maybe past you. Moonlight shines off the skin of his head; his face is lit by small balls of fire dancing in the air over his outstretched palms.<br><br>\"Oh no you don\'t!\" he yells before, the flames flaring with his emotions. \"Get back, you lot!\"<br><br>The wolves immediately tuck their tails between their legs and lay their ears down flat. The apparent leader looks at you and whines.<br><br>\"Not a chance,\" the dwarf scoffs. \"Go on now.\"<br><br>The wolves slink quietly back into the woods, and you realize you are still poised to attack. The dwarf doesn't seem to notice as he approaches. He eyes you up and down, the silence between you stretches.<br><br>Until it breaks with a massive sneeze.<br><br>\"Sorry. You all right?\" he asks with a lopsided smile and a sniffle. \"Didn't have a chance to get a piece off you, did they?\"<br><br>You let him know that you're all in one piece and thank him for his intervention.",
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
    output.appendChild(messageElement);

    typeWriter(message, messageElement, () => {
        output.scrollTop = output.scrollHeight; // Scroll to bottom
    });
    
}

function typeWriter(text, element, callback) {
    let i = 0;
    let isTag = false;
    let textBuffer = '';
    const speed = 25; // Speed in milliseconds

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            if(char === '<'){
                isTag = true;
            }

            if(isTag){
                textBuffer += char;
                if(char === '>'){
                    isTag = false;
                    element.innerHTML += textBuffer;
                    textBuffer = '';
                }
            }
            else{
                element.innerHTML += char;
            }

            i++;
            setTimeout(type, isTag? 0 : speed);
        } else if (callback) {
            callback();
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
// function updateStats() {
//     document.getElementById('health').textContent = gameState.playerHealth;
//     document.getElementById('score').textContent = gameState.score;

//      // Check for winning condition
//      if (gameState.score >= 30) {
//         displayWinPrompt();
//     }
// }

function processCommand(command) {
    command = command.toLowerCase().trim();
    let currentRoom = gameState.rooms[gameState.currentRoom];

    if (gameState.currentRoom !== 'outside' && command !== 'exit console') {
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

        //updateStats();
    } else if (command === 'exit console') {
        transitionToChoicesMode(gameState.currentRoom);
    } else {
        displayMessage('I don\'t understand that command.');
    }
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

function transitionToConsoleMode(nextChoiceNumber) {
    const choice = choices[nextChoiceNumber];
    if (choice) {
        // Hide choice buttons and prompt window
        document.getElementById('succession').style.display = 'none';
        document.getElementById('failure').style.display = 'none';
        document.querySelector('.prompt-description').style.display = 'none';

        // Display console
        document.getElementById('console').style.display = 'block';
        gameState.currentRoom = nextChoiceNumber;

        //Check this is needed
        // Display the room description in the console mode
        // const descriptionElement = document.querySelector(".prompt-description");
        // descriptionElement.innerHTML = ''; // Clear the element's content before starting
        // typeWriter(choice.description, descriptionElement);
    }
}

function transitionToChoicesMode(nextChoiceNumber) {
    const choice = choices[nextChoiceNumber];
    if (choice) {
        document.getElementById('console').style.display = 'none';
        // Hide choice buttons and prompt window
        document.getElementById('succession').style.display = 'block';
        document.getElementById('failure').style.display = 'block';
        document.querySelector('.prompt-description').style.display = 'block';

        handleChoice(gameState.currentRoom);

        // Display the room description in the console mode
        // const descriptionElement = document.querySelector(".prompt-description");
        // descriptionElement.innerHTML = ''; // Clear the element's content before starting
        // typeWriter(choice.description, descriptionElement);
    }
}


// Function to display the win prompt
function displayWinPrompt() {
    document.getElementById('console').style.display = 'none';
    document.getElementById('win-prompt').style.display = 'block';
}

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


/**
 * Tadhg Deeney
 * Date: 2024-09-07
 */
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

function validatePlayerInfo() {
    const playerHealthInput = document.getElementById('player-health');
    const playerCoinInput = document.getElementById('player-coin');
    const startButton = document.getElementById('start-story-btn');

    const healthError = document.getElementById('health-error');
    const coinError = document.getElementById('coin-error');

    const MAX_HEALTH = 50;
    const MAX_COIN = 200;

    let valid = true;

    // Validate health
    if (parseInt(playerHealthInput.value) > MAX_HEALTH) {
        healthError.style.display = 'inline';
        valid = false;
    } else {
        healthError.style.display = 'none';
    }

    // Validate coin
    if (parseFloat(playerCoinInput.value) > MAX_COIN) {
        coinError.style.display = 'inline';
        valid = false;
    } else {
        coinError.style.display = 'none';
    }

    // Enable or disable the Start button based on validity
    startButton.disabled = !valid;
}


// Function to start the game after player info is submitted
function startGameWithPlayerInfo() {
    const playerName = document.getElementById('player-name').value || 'Unnamed Hero';
    const playerHealth = document.getElementById('player-health').value || 100;
    const playerArmour = document.getElementById('player-armour').value || 10;
    const playerCoin = document.getElementById('player-coin').value || 0;

    // Add limiters for coin and health
    const MAX_HEALTH = 50;
    const MAX_COIN = 200;

    // Double-check input values before starting game
    if (playerHealth > MAX_HEALTH || playerCoin > MAX_COIN) {
        alert('Please correct the input values.');
        return;
    }

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
    //typeWriter('Welcome to the adventure, ' + game_stats.player.name + '. Your journey begins now...', document.querySelector(".prompt-description"));
    updateUI();
}



  // Event listener for starting the story after player info is submitted
document.getElementById('start-story-btn').addEventListener('click', function() {
    startGameWithPlayerInfo();
});

const menuBtn = document.getElementById('menu-btn');
const sliderMenu = document.getElementById('slider-menu');

menuBtn.addEventListener('click', () => {
    sliderMenu.classList.toggle('menu-open');
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