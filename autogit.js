// Create a function to perform depth-limited search
function depthLimitedSearch(graph, root, limit) {
  // Create a stack to keep track of nodes to visit
  const stack = [root];
  // Create a set to keep track of visited nodes
  const visited = new Set();
  // Perform DFS until the stack is empty or the limit is reached
  while (stack.length > 0 && limit > 0) {
    // Pop the top node from the stack
    const node = stack.pop();
    // If the node has not been visited, visit it and add its neighbors to the stack
    if (!visited.has(node)) {
      visited.add(node);
      // decrement the limit
      limit--;
      for (const neighbor of graph[node]) {
        stack.push(neighbor);
      }
    }
  }
  // Return the set of visited nodes
  return visited;
}

// Sample graph
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: [],
};

// Perform DFS with a depth limit of 3
const visitedNodes = depthLimitedSearch(graph, 'A', 3);

// Log the visited nodes
console.log(visitedNodes); // Set { 'A', 'B', 'C', 'D', 'E' }
