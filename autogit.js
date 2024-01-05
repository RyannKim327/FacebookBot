class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function sumBinaryTree(root) {
  if (root === null) {
    return 0;
  }
  
  // Calculate the sum of the current node and recursively sum the left and right subtrees
  return root.value + sumBinaryTree(root.left) + sumBinaryTree(root.right);
}

// Example usage:
// Create the binary tree
const root = new Node(4);
root.left = new Node(2);
root.right = new Node(6);
root.left.left = new Node(1);
root.left.right = new Node(3);
root.right.left = new Node(5);
root.right.right = new Node(7);

// Sum of all nodes in the binary tree
console.log(sumBinaryTree(root)); // Output: 28
