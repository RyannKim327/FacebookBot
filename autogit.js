class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }
}

function depthLimitedSearch(root, target, maxDepth) {
  const stack = [];
  stack.push({ node: root, depth: 0 });

  while (stack.length > 0) {
    const { node, depth } = stack.pop();

    if (node.value === target) {
      return node;
    }

    if (depth < maxDepth) {
      for (let child of node.children.reverse()) {
        stack.push({ node: child, depth: depth + 1 });
      }
    }
  }

  return null; // Target not found within the given depth limit
}

// Example usage
const root = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);

root.addChild(node2);
root.addChild(node3);
node2.addChild(node4);
node2.addChild(node5);

console.log(depthLimitedSearch(root, 5, 2)); // Output: Node { value: 5, children: [] }
console.log(depthLimitedSearch(root, 6, 3)); // Output: null (Target not found within the depth limit)
