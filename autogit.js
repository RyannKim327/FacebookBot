class Node {
  constructor(key, value, color) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.left = null;
    this.right = null;
  }
}
const RED = true;
const BLACK = false;
class RedBlackTree {
  constructor() {
    this.root = null;
  }

  // Insert a new node
  insert(key, value) {
    const node = new Node(key, value, RED);
    this._insert(node);
  }

  // Helper function for insertion
  _insert(node) {
    if (this.root === null) {
      this.root = node;
      this.root.color = BLACK;
      return;
    }

    let current = this.root;
    let parent = null;
    while (current) {
      parent = current;
      if (node.key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (node.key < parent.key) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    node.parent = parent;
    this._fixInsert(node);
  }

  // Fix the tree after insertion to maintain red-black properties
  _fixInsert(node) {
    while (node !== this.root && node.parent.color === RED) {
      const uncle = node.uncle;
      const parent = node.parent;
      const grandparent = node.grandparent;

      if (uncle && uncle.color === RED) {
        // Case 1: Uncle is red, perform recoloring
        parent.color = BLACK;
        uncle.color = BLACK;
        grandparent.color = RED;
        node = grandparent;
      } else {
        if (node === parent.right && parent === grandparent.left) {
          // Case 2: Node is right child and parent is left child, perform left rotation on parent
          this._leftRotate(parent);
          node = parent;
          parent = node.parent;
        } else if (node === parent.left && parent === grandparent.right) {
          // Case 3: Node is left child and parent is right child, perform right rotation on parent
          this._rightRotate(parent);
          node = parent;
          parent = node.parent;
        }

        // Case 4: Node and parent are on the same side
        parent.color = BLACK;
        grandparent.color = RED;
        if (node === parent.left) {
          this._rightRotate(grandparent);
        } else {
          this._leftRotate(grandparent);
        }
        break;
      }
    }

    this.root.color = BLACK;
  }

  // Perform left rotation on a node
  _leftRotate(node) {
    const rightChild = node.right;
    node.right = rightChild.left;
    if (rightChild.left) {
      rightChild.left.parent = node;
    }
    rightChild.parent = node.parent;

    if (!node.parent) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;
  }

  // Perform right rotation on a node
  _rightRotate(node) {
    const leftChild = node.left;
    node.left = leftChild.right;
    if (leftChild.right) {
      leftChild.right.parent = node;
    }
    leftChild.parent = node.parent;

    if (!node.parent) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;
  }

  // Search for a node with a given key
  search(key) {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        return current.value;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  // Minimum value in the tree
  min() {
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  // Maximum value in the tree
  max() {
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  // Delete a node with a given key
  delete(key) {
    const node = this._searchNode(key);
    if (!node) {
      return;
    }

    this._deleteNode(node);
  }

  // Helper function to search for a node with a given key
  _searchNode(key) {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        return current;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  // Helper function to delete a node
  _deleteNode(node) {
    const successor = this._findSuccessor(node);

    if (!successor) {
      // Case 1: Node has no successor, directly remove it
      this._removeNode(node);
      return;
    }

    // Case 2: Node has a successor, copy successor's data to node and remove successor
    node.key = successor.key;
    node.value = successor.value;
    this._removeNode(successor);
  }

  // Helper function to find the successor of a node
  _findSuccessor(node) {
    if (node.right) {
      // If right child exists, successor is the leftmost node in the right subtree
      let current = node.right;
      while (current.left) {
        current = current.left;
      }
      return current;
    } else {
      // If no right child, successor is the lowest ancestor with a right child greater than the node's key
      let parent = node.parent;
      while (parent && node === parent.right) {
        node = parent;
        parent = parent.parent;
      }
      return parent;
    }
  }

  // Helper function to remove a node
  _removeNode(node) {
    const isRed = node.color === RED;
    const child = node.left ? node.left : node.right;

    if (!child) {
      // Case 1: Node has no children
      this._replaceNode(node, null);
      if (isRed) {
        return;
      }
      this._fixDelete(node);
    } else if (child.color === RED) {
      // Case 2: Node has one red child
      this._replaceNode(node, child);
      child.color = BLACK;
    } else {
      // Case 3: Node has one or two black children
      let successor = this._findSuccessor(node);
      node.key = successor.key;
      node.value = successor.value;
      this._removeNode(successor);
    }
  }

  // Helper function to replace a node with another node
  _replaceNode(oldNode, newNode) {
    if (!oldNode.parent) {
      this.root = newNode;
    } else if (oldNode === oldNode.parent.left) {
      oldNode.parent.left = newNode;
    } else {
      oldNode.parent.right = newNode;
    }

    if (newNode) {
      newNode.parent = oldNode.parent;
    }
  }

  // Helper function to fix the tree after deletion to maintain red-black properties
  _fixDelete(node) {
    while (node !== this.root && node.color === BLACK) {
      const sibling = node
