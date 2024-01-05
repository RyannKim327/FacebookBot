function breadthFirstSearch(graph, startNode) {
  // Create a queue and enqueue the starting node
  let queue = [startNode];

  // Create a set to keep track of visited nodes
  let visited = new Set();

  // While the queue is not empty
  while (queue.length > 0) {

    // Dequeue a node from the queue
    let currentNode = queue.shift();

    // Mark the node as visited
    visited.add(currentNode);

    // Explore the node's neighbors
    for (let neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        // Enqueue the neighbor if it has not been visited
        queue.push(neighbor);
      }
    }
  }

  // Return the visited nodes
  return visited;
}
