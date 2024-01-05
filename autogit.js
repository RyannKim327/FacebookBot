/**
 * Given the root of a binary tree, return the maximum depth of the tree.
 */
const maxDepth = (root) => {
  // If the tree is empty, return 0
  if (!root) {
    return 0;
  }

  // Recursively calculate the depth of the left and right subtrees
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // Return the greater of the two depths, plus 1 for the current level
  return Math.max(leftDepth, rightDepth) + 1;
};
