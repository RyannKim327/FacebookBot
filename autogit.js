// Node class to represent a vertex in the graph
class Node {
  constructor(id, distance) {
    this.id = id;
    this.distance = distance;
    this.visited = false;
  }
}

// Graph class to represent the complete graph
class Graph {
  constructor() {
    this.nodes = [];
  }

  // Add a node to the graph
  addNode(id) {
    const node = new Node(id, Infinity);
    this.nodes.push(node);
  }

  // Add an edge between two nodes with a given weight
  addEdge(source, destination, weight) {
    const sourceNode = this.getNode(source);
    const destinationNode = this.getNode(destination);

    // Add an edge from source to destination
    sourceNode.edges.push({ node: destinationNode, weight: weight });

    // Add an edge from destination to source (undirected graph)
    destinationNode.edges.push({ node: sourceNode, weight: weight });
  }

  // Get a node by its id
  getNode(id) {
    return this.nodes.find((node) => node.id === id);
  }

  // Dijkstra's algorithm for finding shortest paths
  dijkstra(startNode) {
    // Initialize distances from start node to all other nodes to infinity
    this.nodes.forEach((node) => (node.distance = Infinity));

    // Set the distance of the start node to itself to 0
    startNode.distance = 0;

    // Initialize a priority queue to store nodes based on their distances
    const queue = [];
    queue.push(startNode);

    // While the queue is not empty
    while (queue.length > 0) {
      // Get the node with the smallest distance from the queue
      const currentNode = queue.shift();

      // If the current node has been visited, skip it
      if (currentNode.visited) {
        continue;
      }

      // Mark the current node as visited
      currentNode.visited = true;

      // Update distances of adjacent nodes
      currentNode.edges.forEach((edge) => {
        const adjacentNode = edge.node;
        const newDistance = currentNode.distance + edge.weight;

        // If the new distance is shorter than the current distance of the adjacent node, update the distance
        if (newDistance < adjacentNode.distance) {
          adjacentNode.distance = newDistance;
          queue.push(adjacentNode);
        }
      });
    }
  }

  // Get the shortest path from a start node to a destination node
  getShortestPath(startNode, destinationNode) {
    this.dijkstra(startNode);
    const path = [];

    // If the destination node is unreachable, return an empty array
    if (destinationNode.distance === Infinity) {
      return path;
    }

    // Backtrack from the destination node to the start node
    let currentNode = destinationNode;
    while (currentNode !== startNode) {
      path.unshift(currentNode.id);
      currentNode = this.getNode(
        currentNode.edges.find((edge) => edge.node.id === currentNode.id).node.id
      );
    }

    // Add the start node to the path
    path.unshift(startNode.id);

    return path;
  }
}

// Example usage
const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');

graph.addEdge('A', 'B', 5);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('C', 'D', 3);
graph.addEdge('D', 'E', 1);

const startNode = graph.getNode('A');
const destinationNode = graph.getNode('E');

const shortestPath = graph.getShortestPath(startNode, destinationNode);
console.log(`Shortest path from ${startNode.id} to ${destinationNode.id}: ${shortestPath.join(' -> ')}`);
