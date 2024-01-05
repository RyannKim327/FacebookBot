function topologicalSort(graph) {
  // Create an adjacency list.
  const adjacencyList = {};
  for (const vertex of graph.vertices) {
    adjacencyList[vertex] = [];
  }
  for (const edge of graph.edges) {
    adjacencyList[edge.source].push(edge.destination);
  }

  // Create a stack.
  const stack = [];

  // Initialize the visited array.
  const visited = {};
  for (const vertex of graph.vertices) {
    visited[vertex] = false;
  }

  // Choose a starting vertex.
  const startingVertex = graph.vertices[0];

  // Push the starting vertex onto the stack.
  stack.push(startingVertex);

  // Mark the starting vertex as visited.
  visited[startingVertex] = true;

  // While the stack is not empty:
  while (stack.length > 0) {
    // Pop the top vertex from the stack.
    const vertex = stack.pop();

    // Add the popped vertex to the topological order.
    topologicalOrder.push(vertex);

    // For each neighbor of the popped vertex:
    for (const neighbor of adjacencyList[vertex]) {
      // If the neighbor has not been visited, push it onto the stack.
      if (!visited[neighbor]) {
        stack.push(neighbor);
      }

      // Mark the neighbor as visited.
      visited[neighbor] = true;
    }
  }

  // Return the topological order.
  return topologicalOrder;
}
