function startGame(event) { // HELP FROM ChatGPT
    // Prevent the default action if the button is inside a form or there's any default behavior
    if (event) {
        event.preventDefault();
    }

    // Start the background music after the user clicks "Start Adventure"
    var audio = document.getElementById('bg-music');
    audio.play(); // Play the music when the game starts

    // Hide the start screen and show the game interface
    document.querySelector('.game-text').style.display = 'none'; // Hide the main menu
}
