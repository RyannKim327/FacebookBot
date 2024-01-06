class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

function depthFirstSearch(node, target) {
  if (node == null) {
    return null;
  }

  if (node.value === target) {
    return node;
  }

  for (let child of node.children) {
    const result = depthFirstSearch(child, target);
    if (result !== null) {
      return result;
    }
  }

  return null;
}

// Usage example:
const rootNode = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);

rootNode.addChild(node2);
rootNode.addChild(node3);
node2.addChild(node4);
node3.addChild(node5);

console.log(depthFirstSearch(rootNode, 5)); // Output: Node { value: 5, children: [] }
