const step = 40; // Distance the frog moves per key press

let frogX = 280; // Horizontal position (left)
let frogY = 10; // Vertical position (bottom)

const frog = document.querySelector('.frog');
// Updates the frogs position on the screen by modifying its CSS properties
function updateFrogPosition() {
    frog.style.left = `${frogX}px`;
    frog.style.bottom = `${frogY}px`;
}

function checkPositions() {
    // Get the frog's position
    const frogRect = frog.getBoundingClientRect();

    // log the frog's position (for debugging)
    console.log('Frog Posistion:', frogRect);

    const cars = document.querySelectorAll('.car');

    // Loop through cars and log thier positions
    cars.forEach((car, index) => {
        const carRect = car.getBoundingClientRect();
        console.log(`Car ${index + 1} Position:`, carRect);
    });
}

checkPositions();

function checkCollisions() {

    const frogRect = frog.getBoundingClientRect();

    const cars = document.querySelectorAll('.car');

    // loop through each car and check for collisions 
    cars.forEach((car) => {
        const carRect = car.getBoundingClientRect();

        // Check if the bounding boxes overlap
        if(
            frogRect.right > carRect.left && // Frog's right edge > Car's left edge
            frogRect.left < carRect.right && // Frog's left edge < Car's right edge
            frogRect.bottom > carRect.top && // Frog's bottom edge > Car's top edge
            frogRect.top < carRect.bottom // Frog's top edge < Car's bottom edge
        ) {
            // Collision detected! Reset the frog's position
            resetFrogsPosition();
        }
    });
}

// Function to reset the frog's position
function resetFrogsPosition() {
    // Trigger the flash effect
    frog.classList.add('flash');

    // Remove the flash effect after the animation ends
    setTimeout(() => {
        frog.classList.remove('flash');
    }, 900); // Matches the duration of the CSS animation


    // Set the frog's position back to the start zone
    frogX = 280; // Horizontal starting position
    frogY = 10; // Vertical starting position
    updateFrogPosition(); // Update the frog's position visually
}

setInterval(checkCollisions, 100);


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        frogY += step; // Move up
    } else if (e.key === 'ArrowDown') {
        frogY -= step; // Move down
    } else if (e.key === 'ArrowLeft') {
        frogX -= step; // Move left
    } else if (e.key === 'ArrowRight') {
        frogX += step; // Move right
    }

    if (frogX < 0) frogX = 0; // Prevent moving off the left edge
    if (frogX > 560) frogX = 560; // Prevent moving off the right edge (600px - frog width)
    if (frogY < 0) frogY = 0; // Prevent moving off the bottom
    if (frogY > 360) frogY = 360; // Prevent moving off the top (480px - frog height)

    // Update frog's position on the screen
    updateFrogPosition();
});

// Initialize the frog's position when the game loads
updateFrogPosition();

// Select all log elements
const logs = document.querySelectorAll('.log');

// Function to move the logs dynamically
function moveLogs() {
    logs.forEach((log) => {
        let logPosition = parseInt(window.getComputedStyle(log).left); // Get current position
        const speed = Math.random() * 3 + 1 // Random speed for each log

        // Move the log
        logPosition += speed;

        // Reset the log position if it moved off-screen
        if (logPosition > 600) {
            logPosition = -100 // Restart off-screen to the left
        }

        // Apply the new position
        log.style.left = `${logPosition}px`;
    });

            // Repeat the function for smooth animation
            requestAnimationFrame(moveLogs);
}

// Initialize log movement 
moveLogs();


