class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(vertex) {
    this.vertices[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.vertices[vertex1].push(vertex2);
    this.vertices[vertex2].push(vertex1);
  }

  breadthFirstSearch(startingVertex) {
    const visited = new Set();
    const queue = [startingVertex];

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      console.log(currentVertex);
      visited.add(currentVertex);

      const adjacentVertices = this.vertices[currentVertex];
      for (let i = 0; i < adjacentVertices.length; i++) {
        const vertex = adjacentVertices[i];
        if (!visited.has(vertex)) {
          queue.push(vertex);
          visited.add(vertex);
        }
      }
    }
  }
}

// Example usage
const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);

graph.breadthFirstSearch(1);
