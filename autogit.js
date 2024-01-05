function depthLimitedSearch(graph, startNode, goalNode, maxDepth) {
  // Initialize visited set to keep track of visited nodes
  const visited = new Set();

  // Initialize a stack for depth-first search
  const stack = [startNode];

  // Initialize current depth to 0
  let currentDepth = 0;

  // While the stack is not empty and the maximum depth is not reached
  while (stack.length > 0 && currentDepth < maxDepth) {
    // Pop the current node from the stack
    const currentNode = stack.pop();

    // If the current node has not been visited, visit it and push its neighbors onto the stack
    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      // If the current node is the goal node, return the path
      if (currentNode === goalNode) {
        return constructPath(startNode, currentNode);
      }

      // Push the neighbors of the current node onto the stack
      const neighbors = graph[currentNode];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    // Increment the current depth
    currentDepth++;
  }

  // If the maximum depth was reached and the goal node was not found, return null
  return null;
}

// Function to construct the path from the start node to the goal node
function constructPath(startNode, goalNode) {
  const path = [];
  let currentNode = goalNode;

  // Iterate through the path from the goal node to the start node
  while (currentNode !== startNode) {
    path.unshift(currentNode);

    // Find the parent of the current node
    currentNode = parent[currentNode];
  }

  // Add the start node to the path
  path.unshift(startNode);

  return path;
}
