export function showElement(element) {
    element.style.display = 'block';
}

export function hideElement(element) {
    element.style.display = 'none';
}

export function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

export function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Clear input fields if the player-info-modal is closed
        if (modalId === 'player-info-modal') {
            document.getElementById('username-error').style.display = 'none';
            document.getElementById('health-error').style.display = 'none';
            document.getElementById('coin-error').style.display = 'none';
            document.getElementById('ac-error').style.display = 'none';
        }
    }
}

export function updateUI(game_stats, choices) {
    document.getElementById('health-value').textContent = game_stats.player.health;
    document.getElementById('coin-value').textContent = game_stats.player.coin.toFixed(2);
    document.getElementById('ac-value').textContent = game_stats.player.armour_class;
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