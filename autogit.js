class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(value, priority) {
    this.values.push({ value, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

function dijkstra(graph, start, end) {
  // Create a priority queue to store the nodes we need to visit.
  const queue = new PriorityQueue();

  // Initialize distances to infinity for all nodes, except the start node, which is set to 0.
  const distances = Array(graph.length).fill(Infinity);
  distances[start] = 0;

  // Initialize the previous node for each node to null.
  const previous = Array(graph.length).fill(null);

  // Add the start node to the queue.
  queue.enqueue(start, 0);

  // While the queue is not empty, visit the node with the smallest distance.
  while (queue.values.length > 0) {
    // Get the node with the smallest distance.
    const { value: current } = queue.dequeue();

    // If we reached the end node, we're done.
    if (current === end) {
      break;
    }

    // Loop through all the neighbors of the current node.
    for (const neighbor of graph[current]) {
      // Calculate the distance to the neighbor.
      const distance = distances[current] + graph[current][neighbor];

      // If the new distance is shorter than the current distance, update the distance and previous node for the neighbor.
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;

        // Add the neighbor to the queue.
        queue.enqueue(neighbor, distance);
      }
    }
  }

  // If we didn't reach the end node, there is no path from the start node to the end node.
  if (distances[end] === Infinity) {
    return null;
  }

  // Reconstruct the shortest path from the end node to the start node.
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  // Return the shortest path.
  return path;
}
1 ---- 2
| \   / |
|  \ /  |
|   3    |
\   |   /
 \  |  /
  \ | /
   4
const graph = [
  [{ neighbor: 2, weight: 1 }, { neighbor: 3, weight: 4 }],
  [{ neighbor: 1, weight: 1 }, { neighbor: 3, weight: 2 }, { neighbor: 4, weight: 5 }],
  [{ neighbor: 1, weight: 4 }, { neighbor: 2, weight: 2 }],
  [{ neighbor: 1, weight: 4 }, { neighbor: 4, weight: 1 }],
  [{ neighbor: 2, weight: 5 }, { neighbor: 3, weight: 1 }]
];
const shortestPath = dijkstra(graph, 1, 4);
[1, 2, 4]
