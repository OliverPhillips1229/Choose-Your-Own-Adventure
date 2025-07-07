
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
    // Hide main menu
    document.querySelector('.game-text').style.display = 'none';

    // Start playing background music
    let audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    }

    // First part of the game
    alert("The adventure begins! Get ready for the horror!");
    insideWarehouse();
}

// Function for inventory
function showInventory() {
    // Show inventory
    alert("You haven't found any items yet.")
}

// Function to display first scene
function insideWarehouse() {
    // Transition into the game
    alert("You're now inside the warehouse, strange noises and smells fill the air...");
}

// Initialize the game
window.onload = showMainMenu;