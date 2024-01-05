class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addEdge(node1, node2, weight) {
    this.edges.push({ node1, node2, weight });
  }
}

class Node {
  constructor(value) {
    this.value = value;
  }
}

function bellmanFord(graph, startingNode) {
  // Initialize distance and parent arrays
  const distance = new Array(graph.nodes.length).fill(Infinity);
  const parent = new Array(graph.nodes.length).fill(null);
  distance[startingNode] = 0;

  // Relax edges |V| - 1 times
  for (let i = 0; i < graph.nodes.length - 1; i++) {
    for (const edge of graph.edges) {
      const { node1, node2, weight } = edge;
      const newDistance = distance[node1] + weight;
      if (newDistance < distance[node2]) {
        distance[node2] = newDistance;
        parent[node2] = node1;
      }
    }
  }

  // Check for negative cycles
  for (const edge of graph.edges) {
    const { node1, node2, weight } = edge;
    const newDistance = distance[node1] + weight;
    if (newDistance < distance[node2]) {
      throw new Error("Negative cycle detected!");
    }
  }

  return { distance, parent };
}

// Example usage
const graph = new Graph();
graph.addNode(0);
graph.addNode(1);
graph.addNode(2);
graph.addEdge(0, 1, 1);
graph.addEdge(1, 2, 1);
graph.addEdge(2, 0, -5); // Negative cycle

const result = bellmanFord(graph, 0);
console.log(result);
