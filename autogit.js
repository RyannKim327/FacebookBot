class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addVertex(vertex) {
    this.adjList.set(vertex, []);
  }

  addEdge(vertex1, vertex2) {
    this.adjList.get(vertex1).push(vertex2);
    this.adjList.get(vertex2).push(vertex1);
  }

  getAdjacencyList() {
    return this.adjList;
  }
}
function dfs(graph, startVertex) {
  let visited = [];
  for (let vertex of graph.adjList.keys()) {
    visited[vertex] = false;
  }
  dfsUtil(graph, startVertex, visited);
}

function dfsUtil(graph, vertex, visited) {
  visited[vertex] = true;
  console.log(vertex);

  let neighbors = graph.adjList.get(vertex);
  for (let neighbor of neighbors) {
    if (!visited[neighbor]) {
      dfsUtil(graph, neighbor, visited);
    }
  }
}
let graph = new Graph();

// Adding vertices
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);

// Adding edges
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 4);
graph.addEdge(3, 4);
graph.addEdge(3, 5);

// Depth-First Search
dfs(graph, 0);
