// Node class to represent a node in the graph
class Node {
  constructor(value) {
    this.value = value;
    this.neighbors = [];
    this.visited = false;
  }
}

// Graph class to represent the graph of nodes
class Graph {
  constructor() {
    this.nodes = [];
  }

  // Add a node to the graph
  addNode(node) {
    this.nodes.push(node);
  }

  // Add an edge between two nodes
  addEdge(node1, node2) {
    node1.neighbors.push(node2);
    node2.neighbors.push(node1);
  }

  // Perform breadth-first search starting from a given node
  breadthFirstSearch(startingNode) {
    // Create a queue to store the nodes to visit
    const queue = [];

    // Mark the starting node as visited and enqueue it
    startingNode.visited = true;
    queue.push(startingNode);

    // While the queue is not empty
    while (queue.length > 0) {
      // Dequeue the first node from the queue
      const currentNode = queue.shift();

      // Visit the node's adjacent nodes
      for (const neighbor of currentNode.neighbors) {
        // Check if the neighbor has been visited
        if (!neighbor.visited) {
          // Mark the neighbor as visited and enqueue it
          neighbor.visited = true;
          queue.push(neighbor);
        }
      }
    }
  }
}

// Create a graph
const graph = new Graph();

// Add nodes to the graph
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node(6);

// Add edges to the graph
graph.addEdge(node1, node2);
graph.addEdge(node2, node3);
graph.addEdge(node3, node4);
graph.addEdge(node4, node5);
graph.addEdge(node5, node6);

// Perform breadth-first search starting from node1
graph.breadthFirstSearch(node1);

// Print the order in which nodes were visited
console.log("Nodes visited in order:");
for (const node of graph.nodes) {
  if (node.visited) {
    console.log(node.value);
  }
}
