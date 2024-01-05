// Function to find the sum of all nodes in a binary tree
function sumOfNodes(root) {
  // If the tree is empty, return 0
  if (root === null) {
    return 0;
  }

  // Recursively find the sum of the left and right subtrees
  const leftSum = sumOfNodes(root.left);
  const rightSum = sumOfNodes(root.right);

  // Return the sum of the root node and the subtrees
  return root.val + leftSum + rightSum;
}
