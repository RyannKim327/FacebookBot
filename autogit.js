// A Javascript implementation of the breadth-first search (BFS) algorithm.
// This algorithm starts at a given node and explores all of its neighbors,
// then explores all of their neighbors, and so on.

// The graph is represented as an adjacency list, which is an array of arrays.
// Each array in the adjacency list represents a node and contains the indices
// of all of its neighbors.

// The queue stores the nodes that have been visited but have not yet been fully explored.

function bfs(graph, startNode) {
  // Initialize the queue with the start node.
  const queue = [startNode];

  // Initialize the visited array to keep track of which nodes have been visited.
  const visited = [];

  // While the queue is not empty, continue the BFS.
  while (queue.length > 0) {
    // Dequeue the first node from the queue.
    const node = queue.shift();

    // Mark the node as visited.
    visited.push(node);

    // Visit all of the node's neighbors.
    for (const neighbor of graph[node]) {
      // If the neighbor has not been visited, add it to the queue.
      if (!visited.includes(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  // Return the list of visited nodes.
  return visited;
}
