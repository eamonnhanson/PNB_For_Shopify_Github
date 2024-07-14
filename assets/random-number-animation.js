document.addEventListener("DOMContentLoaded", function() {
    function animateNumber(finalNumber, displayId, intervalDuration, totalDuration) {
        const displayElement = document.getElementById(displayId);
        let currentNumber = 0;

        const randomNumberGenerator = setInterval(() => {
            // Generate a random number up to the final number
            currentNumber = Math.floor(Math.random() * finalNumber);
            displayElement.innerHTML = currentNumber;
        }, intervalDuration);

        setTimeout(() => {
            clearInterval(randomNumberGenerator); // Stop the random number generation
            displayElement.innerHTML = finalNumber; // Set the final number
        }, totalDuration);
    }

    // Call the animateNumber function for each container with specific targets
    animateNumber(3500, 'number-display-1', 50, 5000); // For left container
    animateNumber(35, 'number-display-2', 200, 3500);  // For middle container
    animateNumber(7000, 'number-display-3', 30, 4500); // For right container
    animateNumber(550, 'number-display-4', 50, 5000); // For left container
    animateNumber(250, 'number-display-5', 200, 3500);  // For middle container
    animateNumber(55000, 'number-display-6', 30, 4500); // For right container
    animateNumber(65, 'number-display-7', 50, 5000); // For left container
    animateNumber(0.5, 'number-display-8', 200, 3500);  // For middle container
    animateNumber(130, 'number-display-9', 30, 4500); // For right container
    animateNumber(7500, 'number-display-10', 50, 5000); // For left container
    animateNumber(75, 'number-display-11', 200, 3500);  // For middle container
    animateNumber(15000, 'number-display-12', 30, 4500); // For right container
});
