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

        // Check for inspiration
        const inspirationElement = document.querySelector(".inspiration");
        if (choice.inspiration) {
            inspirationElement.style.color = '#4CAF50';
            inspirationElement.style.pointerEvents = 'auto'; // Make it clickable
            inspirationElement.classList.add('green');
            inspirationElement.onclick = () => {
                inspirationElement.style.color = 'grey';
                inspirationElement.style.pointerEvents = 'none'; // Make it unclickable again
                // Additional logic when inspiration is clicked
                inspirationElement.classList.remove('green');
                handleInspirationClick();
            };
        } /*else {
            inspirationElement.style.color = 'grey';
            inspirationElement.style.pointerEvents = 'none'; // Make it unclickable
            inspirationElement.classList.remove('green');
        }*/

        var amount = document.querySelector(".coin");
        if (choice.coin){
            playerStats.score += amount;
            document.getElementById('score-value').innerText = playerStats.score;
        }
        
        // console.log(choice.description);
        typeWriter(choice.description, descriptionElement, () => {
           
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
        });
    } else {
        console.log('No more choices available.');
    }
    //updateStats();
}

let choices;
var playerStats = {
    score: 0
};

function handleInspirationClick() {
    // Add your logic for what happens when the inspiration element is clicked
    console.log('Gain Inspiration.');
    // For example, you could add logic to increase a player's inspiration points
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

