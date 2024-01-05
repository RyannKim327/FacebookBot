class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  findShortestPath(startNode, endNode) {
    // Initialize distances and previous nodes for all nodes
    const distances = {};
    const previousNodes = {};
    for (const node of this.nodes) {
      distances[node] = Infinity;
      previousNodes[node] = null;
    }
    
    // Set the distance of the start node to 0
    distances[startNode] = 0;

    // Initialize a queue with the start node
    const queue = [startNode];

    // While the queue is not empty
    while (queue.length > 0) {
      // Get the current node from the queue
      const currentNode = queue.shift();

      // If the current node is the end node, we have found the shortest path
      if (currentNode === endNode) {
        return this.reconstructPath(previousNodes, startNode, endNode);
      }

      // For each edge that connects the current node to another node
      for (const edge of this.edges) {
        if (edge.startNode === currentNode) {
          // Get the target node of the edge
          const targetNode = edge.endNode;

          // Calculate the new distance to the target node
          const newDistance = distances[currentNode] + edge.weight;

          // If the new distance is shorter than the current distance to the target node
          if (newDistance < distances[targetNode]) {
            // Update the distance to the target node
            distances[targetNode] = newDistance;

            // Update the previous node of the target node to the current node
            previousNodes[targetNode] = currentNode;

            // Add the target node to the queue
            queue.push(targetNode);
          }
        }
      }
    }

    // No path found
    return [];
  }

  reconstructPath(previousNodes, startNode, endNode) {
    // Initialize the path
    const path = [];

    // Start from the end node and traverse backwards using the previous nodes map
    let currentNode = endNode;
    while (currentNode !== startNode) {
      path.unshift(currentNode);
      currentNode = previousNodes[currentNode];
    }

    // Add the start node to the path
    path.unshift(startNode);

    return path;
  }
}

class Node {
  constructor(value) {
    this.value = value;
  }
}

class Edge {
  constructor(startNode, endNode, weight) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.weight = weight;
  }
}

// Example usage
const graph = new Graph();

const nodeA = new Node('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const nodeD = new Node('D');
const nodeE = new Node('E');

graph.addNode(nodeA);
graph.addNode(nodeB);
graph.addNode(nodeC);
graph.addNode(nodeD);
graph.addNode(nodeE);

graph.addEdge(new Edge(nodeA, nodeB, 5));
graph.addEdge(new Edge(nodeA, nodeC, 2));
graph.addEdge(new Edge(nodeB, nodeC, 1));
graph.addEdge(new Edge(nodeB, nodeD, 3));
graph.addEdge(new Edge(nodeC, nodeD, 4));
graph.addEdge(new Edge(nodeC, nodeE, 6));
graph.addEdge(new Edge(nodeD, nodeE, 2));

const shortestPath = graph.findShortestPath(nodeA, nodeE);

console.log(shortestPath); // [ 'A', 'C', 'D', 'E' ]
