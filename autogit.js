class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    this.adjList.set(vertex, []);
  }

  addEdge(vertex1, vertex2) {
    this.adjList.get(vertex1).push(vertex2);
  }

  getNeighbors(vertex) {
    return this.adjList.get(vertex);
  }
}
function dfs(graph, startVertex) {
  let visited = new Set(); // Track visited vertices

  // Recursive helper function
  function dfsRecursive(vertex) {
    visited.add(vertex);
    console.log(vertex);

    const neighbors = graph.getNeighbors(vertex);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfsRecursive(neighbor);
      }
    }
  }

  dfsRecursive(startVertex);
}
const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');
dfs(graph, 'A');
