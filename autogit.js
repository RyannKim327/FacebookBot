class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

function depthLimitedSearch(root, target, depthLimit) {
  const stack = [];
  stack.push({ node: root, depth: 0 });

  while (stack.length > 0) {
    const { node, depth } = stack.pop();

    if (node.value === target) {
      return true; // Target found
    }

    if (depth < depthLimit) {
      // Add child nodes to the stack
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], depth: depth + 1 });
      }
    }
  }

  return false; // Target not found within depth limit
}

// Usage example
const root = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node(6);

root.children.push(node2, node3);
node2.children.push(node4, node5);
node3.children.push(node6);

console.log(depthLimitedSearch(root, 6, 2)); // Output: true
