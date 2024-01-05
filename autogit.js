// Create a graph using an adjacency list representation
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
};

// Create a stack to keep track of the nodes to visit
const stack = [];

// Create a visited set to keep track of visited nodes
const visited = new Set();

// Function to perform depth-limited search
function depthLimitedSearch(node, limit) {
  // Check if the current depth is greater than the limit
  if (stack.length > limit) {
    return;
  }

  // Check if the node has been visited
  if (visited.has(node)) {
    return;
  }

  // Mark the node as visited
  visited.add(node);

  // Add the node to the stack
  stack.push(node);

  // Visit the node's neighbors
  for (const neighbor of graph[node]) {
    depthLimitedSearch(neighbor, limit);
  }

  // Remove the node from the stack
  stack.pop();
}

// Perform depth-limited search starting from node A with a depth limit of 2
depthLimitedSearch('A', 2);

// Print the visited nodes
console.log('Visited nodes:', visited);
