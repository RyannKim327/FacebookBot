// Iterative Depth-Limited Search (DLS)
function dls(graph, startNode, goalNode, maxDepth) {
  // Stack to store the nodes to be explored
  const stack = [startNode];
  // Visited nodes to avoid cycles
  const visited = new Set();
  // Current depth
  let depth = 0;

  while (stack.length > 0) {
    // Get the current node
    const currentNode = stack.pop();

    // Add the node to visited and increment depth
    visited.add(currentNode);
    depth++;

    // Check if the current node is the goal and if the maxDepth is not exceeded
    if (currentNode === goalNode && depth <= maxDepth) {
      // Goal found, return the path
      return reconstructPath(currentNode);
    }

    // Check if the max depth has been reached
    if (depth > maxDepth) {
      // No solution at this depth, backtrack
      continue;
    }

    // Add the neighbors of the current node to the stack
    const neighbors = graph.getNeighbors(currentNode);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }

    // Decrement depth
    depth--;
  }

  // No solution found
  return null;
}

// Reconstruct the path from the goal node to the start node
function reconstructPath(goalNode) {
  const path = [];
  let currentNode = goalNode;

  while (currentNode !== null) {
    path.push(currentNode);
    currentNode = currentNode.parent;
  }

  // Reverse the path to get the path from start to goal
  path.reverse();

  return path;
}
