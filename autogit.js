// Iterative depth-limited search algorithm
function depthLimitedSearch(graph, start, limit) {
  // Initialize the stack and visited set
  let stack = [start];
  let visited = new Set();
  visited.add(start);

  // Loop while the stack is not empty and the limit is not reached
  while (stack.length > 0 && limit > 0) {
    // Pop the current node from the stack
    let node = stack.pop();

    // Process the current node
    console.log(node);

    // Decrement the limit
    limit--;

    // Add the current node's neighbors to the stack
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        visited.add(neighbor);
      }
    }
  }
}

// Example graph
const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F', 'G'],
  D: [],
  E: [],
  F: [],
  G: [],
};

// Perform depth-limited search from node A with a limit of 3
depthLimitedSearch(graph, 'A', 3);
