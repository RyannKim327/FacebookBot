// Graph data structure
class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(node) {
    this.nodes[node] = [];
  }

  addEdge(node1, node2) {
    this.nodes[node1].push(node2);
  }

  depthFirstSearch(startNode) {
    // Create a stack to keep track of the nodes to visit
    const stack = [startNode];
    // Create a set to keep track of the visited nodes
    const visited = new Set();

    // While there are still nodes to visit, keep looping
    while (stack.length > 0) {
      // Pop the top node from the stack
      const currentNode = stack.pop();

      // If the node has not been visited, add it to the visited set and visit its neighbors
      if (!visited.has(currentNode)) {
        visited.add(currentNode);
        const neighbors = this.nodes[currentNode];

        // Push the neighbors of the current node onto the stack
        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
      }
    }

    // Return the list of visited nodes
    return visited;
  }
}

// Create a graph object
const graph = new Graph();

// Add nodes to the graph
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');

// Add edges to the graph
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

// Perform a depth-first search starting from node 'A'
const visitedNodes = graph.depthFirstSearch('A');

// Print the visited nodes
console.log(visitedNodes);
