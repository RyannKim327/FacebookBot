class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
function countLeafNodes(node) {
  if (node === null) {
    return 0;
  }
  
  if (node.left === null && node.right === null) {
    return 1;
  }
  
  return countLeafNodes(node.left) + countLeafNodes(node.right);
}
// Create a sample binary tree
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

// Count the number of leaf nodes
const leafCount = countLeafNodes(root);
console.log(leafCount); // Output: 4
