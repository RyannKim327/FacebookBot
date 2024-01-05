/**
 * Given a binary tree, find its maximum depth.
 *
 * The maximum depth of a binary tree is the longest path from the root node to a leaf node.
 *
 * @param {TreeNode} root The root node of the binary tree.
 * @return {number} The maximum depth of the binary tree.
 */
const maxDepth = (root) => {
  if (root === null) {
    return 0;
  }

  // Find the maximum depth of the left and right subtrees.
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // The maximum depth of the binary tree is the maximum of the depths of the left and right subtrees plus 1 (for the root node).
  return Math.max(leftDepth, rightDepth) + 1;
};
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

const maxDepth = maxDepth(root);
console.log(maxDepth); // Output: 3
