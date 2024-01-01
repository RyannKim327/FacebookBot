class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
}

function depthLimitedSearch(root, target, depthLimit) {
  const stack = []; // stack to store nodes
  stack.push({ node: root, depth: 0 });

  while (stack.length > 0) {
    const { node, depth } = stack.pop(); // get the top node from the stack

    if (node.value === target) {
      return node;
    }

    if (depth < depthLimit) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], depth: depth + 1 });
      }
    }
  }

  return null; // target not found within the depth limit
}

// Example usage:
const tree = new Node(1, [
  new Node(2, [
    new Node(4, []),
    new Node(5, []),
  ]),
  new Node(3, [
    new Node(6, []),
    new Node(7, []),
  ]),
]);

const targetNode = depthLimitedSearch(tree, 5, 2);
console.log(targetNode); // Node { value: 5, children: [] }
