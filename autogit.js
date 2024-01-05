// Define the iterative depth-limited search algorithm
function iterativeDLS(graph, start, destination, maxDepth) {
  // Initialize the stack with the start node
  let stack = [start];

  // Initialize the visited nodes with the start node
  let visited = new Set();
  visited.add(start);

  // While the stack is not empty and the destination has not been found
  while (stack.length > 0 && !visited.has(destination)) {
    // Pop the top node from the stack
    let current = stack.pop();

    // If the current node is within the max depth limit
    if (getCurrentDepth(current) <= maxDepth) {
      // Visit the current node
      visited.add(current);

      // If the current node is the destination, return true
      if (current === destination) {
        return true;
      }

      // Push the current node's neighbors onto the stack
      for (let neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  // If the destination was not found, return false
  return false;
}

// Helper function to get the current depth of a node
function getCurrentDepth(node) {
  let depth = 0;
  while (node !== null) {
    depth++;
    node = node.parent;
  }
  return depth;
}
