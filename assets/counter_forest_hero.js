document.addEventListener("DOMContentLoaded", function () {
    // Counter Logic
    const counterElement = document.getElementById("subscription-counter");
    const targetNumber = 30;
    let currentNumber = 0;
    let countRepetitions = 0;

    const updateCounter = () => {
        if (currentNumber < targetNumber) {
            currentNumber++;
            counterElement.innerText = currentNumber;
            counterElement.style.transform = "scale(1.2)";
            setTimeout(() => (counterElement.style.transform = "scale(1)"), 100);
            setTimeout(updateCounter, 50);
        } else if (countRepetitions < 2) {
            currentNumber = 0;
            countRepetitions++;
            setTimeout(updateCounter, 500);
        } else {
            startBlinking();
        }
    };

    const startBlinking = () => {
        counterElement.classList.add("blinking");
    };

    updateCounter();

    // Chargebee Checkout Integration
    const script = document.createElement('script');
    script.src = "https://js.chargebee.com/v2/chargebee.js";
    script.setAttribute("data-cb-site", "planteenboom");
    document.head.appendChild(script);
});
