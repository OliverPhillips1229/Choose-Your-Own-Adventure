
function showMainMenu() {
    // Display main menu
    document.querySelector('.game-text').style.display = "block";
    document.querySelector('.game-text h1').textContent = "Flashlight Fear";
    document.querySelector('.game-text p').textContent = "You're about to enter a haunted warehouse. Will you survive?";

    // Create start button
    let startButton = document.createElement('button');
    startButton.textContent = "Start Adventure";
    startButton.onclick = startAdventure;
    document.querySelector('.game-text').appendChild(startButton);

    // Create inventory button
    let inventoryButton = document.createElement('button');
    inventoryButton.textContent = "View Inventory";
    inventoryButton.onclick = showInventory;
    document.querySelector('.game-text').appendChild(inventoryButton);
}

// Function to start game
function startAdventure() {
    // Hide the main menu and show the game text 
    document.querySelector('.game-container').style.display = 'block';  // Hide main menu
    document.querySelector('.gameplay-container').style.display = 'block'; // BROKEN
    document.querySelector('.play-text').style.display = 'block'; // Show game text

    // Start playing the background music (if not already playing)
    let audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    }

    // Display the first game scene directly on the screen
    displayGameMessage("The adventure begins! Get ready for the horror...");
    displayGameMessage("You're now inside the haunted warehouse, and strange noises fill the air...");

    // Call the first game scene function (like 'insideWarehouse()')
    insideWarehouse();
}

// Function for inventory
function showInventory() {
    // Show inventory
    displayGameMessage("You haven't found any items yet.")
}

// Function to display a message on the screen // needs fixes
function displayGameMessage(message) {
    const messageContainer = document.createElement('p');
    messageContainer.textContent = message;

    // Get the play-text container and ensure it's visible
    const playText = document.querySelector('.play-text');

    if (playText) {
        playText.appendChild(messageContainer);

        // Ensure the message scrolls down if necessary
        playText.scrollTop = playText.scrollHeight;
    } else {
        console.error("play-text container is not found!");
    }
}


// Function for the first game scene (e.g., inside the haunted warehouse)
function insideWarehouse() {
    // Display the first set of choices or interactions here
    displayGameMessage("You hear footsteps in the distance. What do you do?");
    // Create buttons for first choice
    let investigateButton = document.createElement('button');
    investigateButton.textContent = 'Investigate the noise';
    investigateButton.onclick = investigateNoise;
    document.querySelector('.play-text').appendChild(investigateButton);

    let leaveButton = document.createElement('button');
    leaveButton.textContent = 'Leave the warehouse';
    leaveButton.onclick = leaveWarehouse;
    document.querySelector('.play-text').appendChild(leaveButton);
}

/// Function for investigating the noise
function investigateNoise() {
    displayGameMessage("You walk toward the noise and find a dark shadow lurking in the corner...");

    // Further logic for what happens when investigating the noise
    displayGameMessage("What will you do next?");
    
    // Create new choices, for example, attack the shadow or run.
    let attackButton = document.createElement('button');
    attackButton.textContent = 'Attack the shadow';
    attackButton.onclick = attackShadow;
    document.querySelector('.play-text').appendChild(attackButton);

    let runButton = document.createElement('button');
    runButton.textContent = 'Run away!';
    runButton.onclick = runAway;
    document.querySelector('.play-text').appendChild(runButton);
}

// Function for leaving the warehouse (Game Over)
function leaveWarehouse() {
    displayGameMessage("You decide to leave the warehouse, but something feels off... You’ve walked into danger.");
    displayGameMessage("You have died. Game Over.");

    // Create a Restart button to reload the game
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = restartGame;
    document.querySelector('.play-text').appendChild(restartButton);
}

// Function to restart the game
function restartGame() {
    window.location.reload(); // Reload the page to restart the game
}

// Function for attacking the shadow (Further branching logic)
function attackShadow() {
    displayGameMessage("You attack the shadow, but it's a monster! You’ve been defeated.");
    displayGameMessage("You have died. Game Over.");
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = restartGame;
    document.querySelector('.play-text').appendChild(restartButton);
}

// Function for running away from the shadow (Another branch)
function runAway() {
    displayGameMessage("You run away, but the monster catches up with you. You have died.");
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = restartGame;
    document.querySelector('.play-text').appendChild(restartButton);
}


// Initialize the game
window.onload = showMainMenu;