export function typeWriter(text, element, callback) {
    let i = 0;
    const speed = 25; // Speed in milliseconds
    element.innerHTML = ""; // Clear any previous content before typing new text

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

export function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    if(game_stats){
        game_stats.settings.dark_mode = isDarkMode;
    }
}

export function setDarkMode(enable){
    if (enable) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}