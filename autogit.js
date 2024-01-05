// Create a queue using an array
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty())
      return "Underflow";
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length == 0;
  }
}

// BFS implementation
function breadthFirstSearch(graph, startNode) {
  let visited = new Set();
  let queue = new Queue();

  visited.add(startNode);
  queue.enqueue(startNode);

  while (!queue.isEmpty()) {
    let currentNode = queue.dequeue();
    
    console.log(currentNode); // Process the node

    let neighbors = graph[currentNode];
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.enqueue(neighbor);
      }
    }
  }
}

// Example graph
let graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "E"],
  D: ["B"],
  E: ["C"]
};

// Run BFS starting from node "A"
breadthFirstSearch(graph, "A");
