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