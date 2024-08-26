let choices;
let playerStats = {
    score: 0, // Initialise the score to 0
    inspiration: false
};

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
                // Find the closing tag or move forward until '>'
                const endIndex = text.indexOf('>', i);
                if (endIndex !== -1) {
                    // Append the entire tag
                    const tag = text.substring(i, endIndex + 1);
                    element.innerHTML += tag;
                    i = endIndex + 1;
                } else {
                    // In case '>' is not found, handle as normal character
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                // Append normal character
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
    typeWriter(choice.description, document.querySelector(".prompt-description"), () => {
        setTimeout(() => {
            enableButtons();
            updateButtons(choice);
        }, 500);
    });
}

function disableButtons(){
    console.log('Disabling buttons');
    document.getElementById('succession').disabled = true;
    document.getElementById('failure').disabled = true;
}

function enableButtons(){
    console.log('Enabling buttons');
    document.getElementById('succession').disabled = false;
    document.getElementById('failure').disabled = false;
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
    descriptionElement.innerHTML = ''; // Clear the element's content
}

function handleInspiration(choice) {
    const inspirationElement = document.querySelector(".inspiration");

    if (choice.inspiration) {
        playerStats.inspiration = true;
    }

    if (playerStats.inspiration) {
        inspirationElement.style.color = '#4CAF50';
        inspirationElement.style.pointerEvents = 'auto';
        inspirationElement.classList.add('green');

        inspirationElement.onclick = () => {
            inspirationElement.style.color = 'grey';
            inspirationElement.style.pointerEvents = 'none';
            inspirationElement.classList.remove('green');

            playerStats.inspiration = false;
        };
    } 
}

function updateScore(choice) {
    if (choice.coin) {
        playerStats.score += choice.coin;
        document.getElementById('score-value').innerText = playerStats.score;
    }
}

document.getElementById('start-btn').addEventListener('click', () => {
    loadStory().then(story => {
        if (story) {
            document.getElementById('start-game').style.display = 'none';
            document.getElementById('story-prompt').style.display = 'block';
            loadChapter(story, 1).then(chapter => {
                choices = chapter;
                document.getElementById('nav-title').innerHTML = chapter["title"];
                handleChoice(0);
                // console.log('Chapter loaded:', chapter);
            }).catch(error => {
                console.error('Failed to load chapter:', error);
            });
        }
    }).catch(error => {
        console.error('Failed to load story:', error);
    });
});

  // Event listener for the theme toggle switch
document.getElementById('theme-toggle').addEventListener('change', (event) => {
    document.body.classList.toggle('dark-mode', event.target.checked);
    document.getElementById('game-area').classList.toggle('dark-mode', event.target.checked);
    document.getElementById('output').classList.toggle('dark-mode', event.target.checked);
});

