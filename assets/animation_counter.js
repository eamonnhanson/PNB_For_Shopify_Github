document.addEventListener("DOMContentLoaded", () => {
  const treeCountElement = document.getElementById("tree-count");
  const remainingCountElement = document.getElementById("remaining-count");
  const forestProgress = document.getElementById("forest-progress");

  const totalTrees = 34; // Total number of trees to display
  const goal = 100; // Total goal of forest heroes
  const animationDuration = 10 * 1000; // 10 seconds total animation
  const interval = animationDuration / totalTrees; // Interval between adding trees

  let currentTrees = 0;

  // Function to get a random position in the bottom section of the container
  const getRandomPosition = () => {
    const containerWidth = forestProgress.offsetWidth;
    const containerHeight = forestProgress.offsetHeight;

    // Generate random x within the width of the container
    const x = Math.random() * (containerWidth - 50); // Random x, accounting for tree width (~50px)

    // Constrain y to the bottom 25% of the container
    const y = Math.random() * (containerHeight * 0.25) - 20;
    return { x, y };
  };

  // Function to add a new tree
  const addTree = () => {
    if (currentTrees < totalTrees) {
      currentTrees++;

      // Update the counter text
      treeCountElement.textContent = currentTrees;
      remainingCountElement.textContent = goal - currentTrees; // Update remaining count

      // Create and append a new tree element
      const tree = document.createElement("img");
      tree.src = "https://cdn.shopify.com/s/files/1/0555/9966/1149/files/tree1_48px.png?v=1735652471"; // Replace with your tree image URL
      tree.classList.add("tree");

      // Position the tree
      const { x, y } = getRandomPosition();
      tree.style.left = `${x}px`;
      tree.style.bottom = `${y}px`;

      // Append to the forest container
      forestProgress.appendChild(tree);
    }
  };

  // Start the animation
  const animationInterval = setInterval(() => {
    addTree();

    // Stop the interval when all trees are added
    if (currentTrees === totalTrees) {
      clearInterval(animationInterval);
    }
  }, interval);

  // Initial state
  treeCountElement.textContent = currentTrees;
  remainingCountElement.textContent = goal - currentTrees;
});
