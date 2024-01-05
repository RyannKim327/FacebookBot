class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
class AVLTree {
  constructor() {
    this.root = null;
  }

  // Other tree operations will be implemented here
}
function height(node) {
  if (node === null) return 0;
  return node.height;
}
function updateHeight(node) {
  node.height = Math.max(height(node.left), height(node.right)) + 1;
}
function leftRotate(node) {
  const newRoot = node.right;
  node.right = newRoot.left;
  newRoot.left = node;

  updateHeight(node);
  updateHeight(newRoot);

  return newRoot;
}
function rightRotate(node) {
  const newRoot = node.left;
  node.left = newRoot.right;
  newRoot.right = node;

  updateHeight(node);
  updateHeight(newRoot);

  return newRoot;
}
function balanceFactor(node) {
  return height(node.left) - height(node.right);
}
function insert(value, root) {
  if (root === null) {
    return new Node(value);
  }

  if (value < root.value) {
    root.left = insert(value, root.left);
  } else if (value > root.value) {
    root.right = insert(value, root.right);
  } else {
    // Duplicate values are not allowed in an AVL tree
    return root;
  }

  updateHeight(root);

  const balance = balanceFactor(root);

  // Left-Left case
  if (balance > 1 && value < root.left.value) {
    return rightRotate(root);
  }

  // Right-Right case
  if (balance < -1 && value > root.right.value) {
    return leftRotate(root);
  }

  // Left-Right case
  if (balance > 1 && value > root.left.value) {
    root.left = leftRotate(root.left);
    return rightRotate(root);
  }

  // Right-Left case
  if (balance < -1 && value < root.right.value) {
    root.right = rightRotate(root.right);
    return leftRotate(root);
  }

  return root;
}
const avlTree = new AVLTree();

avlTree.root = insert(10, avlTree.root);
avlTree.root = insert(20, avlTree.root);
avlTree.root = insert(30, avlTree.root);
avlTree.root = insert(40, avlTree.root);
avlTree.root = insert(50, avlTree.root);
