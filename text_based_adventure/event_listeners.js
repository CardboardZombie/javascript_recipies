import { showElement, hideElement, openModal, closeModal, updateUI } from './ui.js';
import { game_stats, loadGame, saveGame, deleteSave } from './game_state.js';

const mainMenu = document.getElementById('main-menu');
const gameOptions = document.getElementById('game-options-menu');
const loadGameMenu = document.getElementById('load-game-menu');
const gameArea = document.getElementById('story-prompts');
const saveSlots = document.getElementById('save-slots');


export function setupEventListeners() {
    document.getElementById('menu-btn').addEventListener('click', () => {
        document.getElementById('slider-menu').classList.toggle('menu-open');
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Modal elements
        var skillpointsBtn = document.getElementById('menu-btn-skillpoints');
        var faqBtn = document.getElementById('menu-btn-faqs');
        var settingsBtn = document.getElementById('settings-btn');
        var editProfileBtn = document.getElementById('edit-profile-btn');
        var closeBtns = document.getElementsByClassName('close-btn');
        var submitProfileBtn = document.getElementById('submit-profile-btn');
        var howToBtn = document.getElementById('how-to-play-btn');
        var newGameBtn = document.getElementById('new-game-btn');
        var startGameBtn = document.getElementById('start-btn'); // Add this line

        howToBtn.addEventListener('click', function(){
            openModal('faq-modal');
        });

        skillpointsBtn.addEventListener('click', function() {
            openModal('skillpoints-modal');
        });

        faqBtn.addEventListener('click', function() {
            openModal('faq-modal');
        });

        settingsBtn.addEventListener('click', function() {
            openModal('settings-modal');
        });

        editProfileBtn.addEventListener('click', function() {
            openModal('player-info-modal');
        });

        newGameBtn.onclick = function() {
            openModal('player-info-modal');
        };

        startGameBtn.addEventListener('click', function() { // Add this event listener
            startGame();
        });

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

        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal(event.target.id);
            }
            if (event.target.id !== 'menu-btn' && event.target.classList.contains('toggle-dark-mode') === false) {
                closeMenuSlider();
            }
        });

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
                game_stats.player = {
                    name: name,
                    health: parseInt(health),
                    armour_class: parseInt(armour),
                    coin: parseFloat(coin),
                    inventory: ['sword', 'shield'],
                    inspiration: false
                };
                updateUI(game_stats, choices);
                document.getElementById('stats').style.display = 'flex';
                startGame();
            }
        });
    });
}

function closeMenuSlider() {
    document.getElementById('slider-menu').classList.remove('menu-open');
}