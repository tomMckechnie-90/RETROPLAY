// Distance the frog moves per key press
const step = 40;

const scoreElement = document.getElementById('score');


// Initial position of the frog
let frogX = 280; // Horizontal position
let frogY = 10; // Vertical position
let isOnLog = false; // Tracks if the frog is on a log
let isResetting = false; // Tracks if the frog is being reset
let score = 0;
// let lives = 3;

// Reference to the frog element in the HTML
const frog = document.querySelector('.frog');
const logs = document.querySelectorAll('.log');
const cars = document.querySelectorAll('.car');
const homeBaseZones = document.querySelectorAll('.home-base-zone')

// Function to Update Frog's Position
function updateFrogPosition() {
    console.log(`Updating Frog Position: Left - ${frogX}px, Bottom - ${frogY}px`);
    frog.style.left = `${frogX}px`;
    frog.style.bottom = `${frogY}px`;
}

// Initial call to set the frog's position when the game loads
updateFrogPosition();

// Function to Move Logs
function moveLogs() {
    logs.forEach((log, index) => {
        let logPosition = parseInt(window.getComputedStyle(log).left) || 0;
        const speed = 2; // Speed at which logs move
        logPosition += speed;

        // Reset log position if it moves off-screen
        if (logPosition > 600) {
            logPosition = -100; // Move it back to the left
        }

        log.style.left = `${logPosition}px`;
        // console.log(`Log ${index + 1} Position: ${logPosition}px`);
    });
}

// Move the frog with keyboard inputs
document.addEventListener('keydown', (e) => {
    // console.log(`Key pressed: ${e.key}`); Log the key pressed

    if (e.key === 'ArrowUp') {
        frogY += step; // Move up
    } else if (e.key === 'ArrowDown') {
        frogY -= step; // Move down
    } else if (e.key === 'ArrowLeft') {
        frogX -= step; // Move left
    } else if (e.key === 'ArrowRight') {
        frogX += step; // Move right
    }

    // Ensure the frog doesn't move off the screen
    if (frogX < 0) frogX = 0; // Left edge
    if (frogX > 560) frogX = 560; // Right edge
    if (frogY < 0) frogY = 0; // Bottom edge
    if (frogY > 360) frogY = 360; // Top edge

    updateFrogPosition(); // Update the frog's position on the screen
});

// Check for collisions with cars
function checkCollisions() {
    if (isResetting) return; // Skip collision check if the frog is resetting

    const frogRect = frog.getBoundingClientRect(); // Get the frog's bounding box
    // console.log('Checking collisions...');

    cars.forEach((car, index) => {
        const carRect = car.getBoundingClientRect(); // Get the car's bounding box

        // Check if the bounding boxes overlap
        if (
            frogRect.right > carRect.left &&
            frogRect.left < carRect.right &&
            frogRect.bottom > carRect.top &&
            frogRect.top < carRect.bottom
        ) {
            console.log(`Collision detected with Car ${index + 1}`);
            // updateLives();
            resetFrogPosition(); // Reset the frog's position upon collision
        }
    });
}

// Update Score
function updateScore() {
    score += 50; // Increment score
    scoreElement.textContent = `Score: ${score}`; // Update score display
}


// Reset the game
function resetGame() {
    updateScore();
    resetFrogPosition();
}

// Reset the frog's position
function resetFrogPosition() {
    isResetting = true; // Set the flag to indicate resetting
    console.log('Resetting frog position...');

    // Add the flash effect
    frog.classList.add('flash');

    setTimeout(() => {
        frog.classList.remove('flash'); // Remove the flash effect after animation
        frogX = 280; // Reset horizontal position
        frogY = 10; // Reset vertical position
        isResetting = false; // Clear the resetting flag
        updateFrogPosition(); // Update the frog's position on screen
        console.log('Frog position reset completed.');
    }, 900); // Duration matches the CSS animation time
}

// Check if the frog is on a log
function checkLogCollisions() {
    const frogRect = frog.getBoundingClientRect(); // Get the frog's bounding box
    isOnLog = false; // Reset log state

    logs.forEach((log, index) => {
        const logRect = log.getBoundingClientRect(); // Get the log's bounding box

        // Check if the bounding boxes overlap
        if (
            frogRect.right > logRect.left && // Frog's right edge > Log's left edge
            frogRect.left < logRect.right && // Frog's left edge < Log's right edge
            frogRect.bottom > logRect.top && // Frog's bottom edge > Log's top edge
            frogRect.top < logRect.bottom // Frog's top edge < Log's bottom edge
        ) {
            console.log(`Frog is on Log ${index + 1}`);
            isOnLog = true; // Frog is on a log
            moveFrogWithLog(log); // Move the frog with the log
        }
    });

    // Check if the frog is in the river and not on a log
    const isInFirstRiver = frogY >= 280 && frogY <= 320;
    const isInSecondRiver = frogY >= 120 && frogY <= 160;
    if (!isOnLog && (isInFirstRiver || isInSecondRiver)) {
        resetFrogPosition();
    }
}

// Move the frog with the log
function moveFrogWithLog(log) {
    const logSpeed = 2; // Match log speed
    frogX += logSpeed; // Move frog horizontally with log
    updateFrogPosition(); // Update visually
}

function checkHomeBase() {
    const frogRect = frog.getBoundingClientRect();
    const homeBase = document.querySelector('.home-base')
    const homeBaseRect = homeBase.getBoundingClientRect();

    console.log(`Frog Rect: ${JSON.stringify(frogRect)}`);
    console.log(`Home Base Rect: ${JSON.stringify(homeBaseRect)}`);

    if (
        frogRect.right > homeBaseRect.left &&
        frogRect.left < homeBaseRect.right &&
        frogRect.bottom > homeBaseRect.top &&
        frogRect.top < homeBaseRect.bottom
    ) {
        console.log('Frog reached home base!'); 
        checkHomeBaseZones();
    } else {
        // resetFrogPosition()
    }
}

// Function to Check if the Frog has reached any Home Base Zone
function checkHomeBaseZones() {
    const frogRect = frog.getBoundingClientRect();

    homeBaseZones.forEach((zone, index) => {
        const zoneRect = zone.getBoundingClientRect();

        console.log(`Checking zone ${index + 1} - Frog Rect: ${JSON.stringify(frogRect)}, Zone Rect: ${JSON.stringify(zoneRect)}`);

        if (
            frogRect.right > zoneRect.left &&
            frogRect.left < zoneRect.right &&
            frogRect.bottom > zoneRect.top &&
            frogRect.top < zoneRect.bottom
        ) {
            console.log(`Frog reached home base zone ${index + 1}!`);
            updateScore();
            zone.classList.add('occupied'); // Mark the zone as occupied
            resetFrogPosition();
        }
    })
}

// The game loop
function gameLoop() {
    moveLogs();
    checkLogCollisions(); // Check if the frog is on a log
    checkCollisions(); // Check for collisions with cars
    checkHomeBase();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
