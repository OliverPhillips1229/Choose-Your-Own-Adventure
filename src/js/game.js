
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
function clearPlayText() {
    const playText = document.querySelector('.play-text');
    playText.innerHTML = "";
}

let currentScene = null; // Keeps track of where we left off

// Function to start game
function startAdventure() {
    // remove start button after click
    const startButton = document.querySelector('.game-text button').remove();
    // Hide the main menu and show the game text 
    document.querySelector('.game-container').style.display = 'block';  // Hide main menu
    document.querySelector('.gameplay-container').style.display = 'block'; // FIXED
    document.querySelector('.play-text').style.display = 'block'; // Show game text

    // Start playing the background music (if not already playing)
    let audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    }

    // Display the first game scene directly on the screen
    displayGameMessage("The adventure begins! Get ready for the horror...");
    displayGameMessage("You're now inside the haunted warehouse, and strange noises fill the air...");

    // Call the first game scene function
    insideWarehouse();
}

// Function for adding to inventory
let inventory = []
function addToInventory(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        displayGameMessage(`${item} has been added to your inventory.`);
    }
}

// Function for inventory
function showInventory() {
    const playText = document.querySelector('.play-text');
    clearPlayText();

    playText.innerHTML = "<h3>Inventory</h3>";

    if (inventory.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = "You haven't found any items yet.";
        playText.appendChild(noItemsMessage);
    } else {
        const list = document.createElement('ul');
        inventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
        playText.appendChild(list);
    }

    // Add back button to resume gameplay
    const backButton = document.createElement('button');
    backButton.textContent = "Back to Game";
    backButton.onclick = () => {
        clearPlayText();
        if (typeof currentScene === "function") {
            currentScene(); // ✅ Resume from saved scene
        } else {
            displayGameMessage("You return to the game... but something feels off.");
        }
    };

    playText.appendChild(backButton);
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
    // set scene
    currentScene = insideWarehouse;
    // Clearing screen
    clearPlayText();
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
    // set scene
    currentScene = investigateNoise;
    // Clearing screen
    const playText = document.querySelector('.play-text');
    clearPlayText();
    displayGameMessage("You walk toward the noise...");
    addToInventory("Rusty Key");
    // Further logic for what happens when investigating the noise
    displayGameMessage("What will you do next?");

    // Create new choices, for example, attack the shadow or run.
    let approachButton = document.createElement('button');
    approachButton.textContent = 'Approach the shadows';
    approachButton.onclick = approachShadow;
    playText.appendChild(approachButton);

    let runButton = document.createElement('button');
    runButton.textContent = 'Run away!';
    runButton.onclick = runAway;
    playText.appendChild(runButton);
}

// Function for leaving the warehouse (Game Over)
function leaveWarehouse() {
    // set scene
    currentScene = leaveWarehouse;
    // Clearing screen
    clearPlayText();
    displayGameMessage("You turn toward the exit, but the door is locked. As you turn back to venture further you are attacked by a masked figure weilding a hatchet.");
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

// Function for approaching the shadow (Further branching logic)
function approachShadow() {
    const playText = document.querySelector('.play-text');
    // set scene
    currentScene = approachShadow;
    // Clearing screen
    clearPlayText();
    displayGameMessage("You approach the shadow... as it vanishes, it leaves something behind.");
    addToInventory("Mysterious Note");
    displayGameMessage("The note reads: 'Only metal can set you free.'");

    let doorButton = document.createElement('button');
    doorButton.textContent = "Try opening the nearby door"
    doorButton.onclick = tryDoor;
    playText.appendChild(doorButton);

    let mainDoorButton = document.createElement('button');
    mainDoorButton.textContent = "Try Main Door";
    mainDoorButton.onclick = tryMainDoor;
    playText.appendChild(mainDoorButton);

    let inventoryButton = document.createElement('button');
    inventoryButton.textContent = "Check Inventory";
    inventoryButton.onclick = showInventory;
    playText.appendChild(inventoryButton);

}

function tryDoor() {
    const playText = document.querySelector('.play-text');
    // set scene
    currentScene = tryDoor;
    // Clearing scene
    clearPlayText();

    if (inventory.includes("Rusty Key")) {
        displayGameMessage("You insert the Rusty Key into the heavy metal door...");
        displayGameMessage("It creaks open. You’ve escaped the first room!");

        let nextButton = document.createElement('button');
        nextButton.textContent = "Continue into darkness";
        nextButton.onclick = enterNextRoom;
        playText.appendChild(nextButton);
    } else {
        displayGameMessage("The door is locked. You need a key.");

        let backButton = document.createElement('button');
        backButton.textContent = "Go back";
        backButton.onclick = insideWarehouse;
        playText.appendChild(backButton);
    }
}

function tryMainDoor() {
    const playText = document.querySelector('.play-text');
    currentScene = tryMainDoor;
    clearPlayText();

    displayGameMessage("You return to the main entrance. You fumble with the Rusty Key in your sweaty hands...");

    if (inventory.includes("Rusty Key")) {
        displayGameMessage("You shove the key into the lock and turn it...");
        displayGameMessage("It doesn't fit. You hear breathing behind you.");
        displayGameMessage("Before you can run, a hatchet rips through your spine.");
        displayGameMessage("You have died. Game Over.");

        const obituary = document.createElement('div');
        obituary.style.marginTop = "20px";
        obituary.innerHTML = `
            <h3>📰 Obituary</h3>
            <p><strong>You:</strong> Believer in brute force over brainpower.</p>
            <p><strong>Cause of Death:</strong> Used the wrong key. On the wrong door.</p>
            <p><strong>Last Words:</strong> "This has to work... right?"</p>
            <p><strong>Casket Note:</strong> Brought to you by rust and regret.</p>
        `;
        playText.appendChild(obituary);

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        restartButton.onclick = restartGame;
        playText.appendChild(restartButton);
    } else {
        displayGameMessage("You try the door, but it’s locked tight—and you don’t even have a key.");

        const backButton = document.createElement('button');
        backButton.textContent = "Go Back";
        backButton.onclick = insideWarehouse;
        playText.appendChild(backButton);
    }
}

function enterNextRoom() {
    const playText = document.querySelector('.play-text');
    // set scene
    currentScene = enterNextRoom;
    // Clearing scene
    clearPlayText();

    displayGameMessage("You stumble into a hallway with a flickering flashlight in the corner.. you hear scurrying...");
    displayGameMessage("What will you do next?");

    let flashlightButton = document.createElement('button');
    flashlightButton.textContent = "Pick up flashlight";
    flashlightButton.onclick = Flashlight;
    playText.appendChild(flashlightButton);

    let investigateScurriesButton = document.createElement('button');
    investigateScurriesButton.textContent = "Investigate the scurries";
    investigateScurriesButton.onclick = Scurries;
    playText.appendChild(investigateScurriesButton);
}

function Flashlight() {
    const playText = document.querySelector('.play-text');
    // set scene
    currentScene = Flashlight
    // CLearing scene
    clearPlayText();
    displayGameMessage("You grab the flashlight. It flickers to life, barely illuminating the room...");
    // Add more logic here later
}

function Scurries() {
    const playText = document.querySelector('.play-text');
    // set scene
    currentScene = Scurries;
    // Clearing scene
    clearPlayText();

    displayGameMessage("You creep toward the sound... something darts past your feet.");
    displayGameMessage("Without thinking, you reach down and grab it.");
    displayGameMessage("It's a rat. A frothing, writhing, clearly rabid rat.");
    displayGameMessage("Why would you grab a rabid rat?");
    displayGameMessage("It bites deep into your hand. You contract rabies.");
    displayGameMessage("Foam gathers at the corners of your mouth. You fall, shaking, and choke on your own tongue.");
    displayGameMessage("You have died. Game Over.");

    // Funny obituary, just to add an extra element to the game
    const obituary = document.createElement('div');
    obituary.style.marginTop = "20px";
    obituary.innerHTML = `
        <h3>📰 Obituary</h3>
        <p><strong>You:</strong> Brave... but not terribly bright.</p>
        <p><strong>Cause of Death:</strong> Thought the rat was a puppy.</p>
        <p><strong>Last Words:</strong> "Who's a good boy?"</p>
        <p><strong>Funeral Note:</strong> No open casket. Too much froth.</p>
    `;
    playText.appendChild(obituary);

    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart Game";
    restartButton.onclick = restartGame;
    playText.appendChild(restartButton);
}

// Function for running away from the warehouse
function runAway() {
    // set scene
    currentScene = runAway;
    // Clearing screen
    clearPlayText();
    displayGameMessage("You run toward the exit, but the door is locked and the key doesn't fit. As you turn back to venture further you are attacked by a masked figure weilding a hatchet. You have died.");
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = restartGame;
    document.querySelector('.play-text').appendChild(restartButton);
}

// Initialize the game
window.onload = showMainMenu;