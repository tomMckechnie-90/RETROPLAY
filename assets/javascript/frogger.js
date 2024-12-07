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
            console.log('Collision detected with a car!')
        }
    });
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



