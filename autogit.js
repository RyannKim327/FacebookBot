class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children || [];
  }
}

function breadthLimitedSearch(startNode, targetValue, depthLimit) {
  let queue = [startNode];
  let depth = 0;
  
  while (queue.length > 0 && depth <= depthLimit) {
    let currentNode = queue.shift();

    if (currentNode.value === targetValue) {
      return currentNode;
    }
    
    if (depth < depthLimit) {
      queue.push(...currentNode.children);
    }

    depth++;
  }

  return null;
}

// Example usage:
let graph = new Node('A', [
  new Node('B', [
    new Node('C'),
    new Node('D'),
  ]),
  new Node('E', [
    new Node('F'),
    new Node('G', [
      new Node('H'),
      new Node('I'),
    ]),
  ]),
]);

let targetNode = breadthLimitedSearch(graph, 'H', 2);

if (targetNode) {
  console.log(`Target node found: ${targetNode.value}`);
} else {
  console.log('Target node not found within depth limit.');
}
