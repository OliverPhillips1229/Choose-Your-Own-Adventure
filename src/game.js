
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
