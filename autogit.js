class Node {
  constructor(key, value, color) {
    this.key = key;
    this.value = value;
    this.color = color; // "red" or "black"
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}
class Tree {
  constructor() {
    this.root = null;
  }

  // Insert a key-value pair into the tree
  insert(key, value) {
    const newNode = new Node(key, value, "red");
    this._insert(newNode);
    this._fixInsert(newNode);
  }

  // Helper method to insert a node into the tree
  _insert(node) {
    if (this.root === null) {
      this.root = node;
    } else {
      this._insertNode(node, this.root);
    }
  }

  // Helper method to insert a node into its proper position
  _insertNode(node, currNode) {
    if (node.key < currNode.key) {
      if (currNode.left === null) {
        currNode.left = node;
        node.parent = currNode;
      } else {
        this._insertNode(node, currNode.left);
      }
    } else {
      if (currNode.right === null) {
        currNode.right = node;
        node.parent = currNode;
      } else {
        this._insertNode(node, currNode.right);
      }
    }
  }

  // Fix the red-black tree properties after insertion
  _fixInsert(node) {
    while (node !== this.root && node.parent.color === "red") {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;
        if (uncle.color === "red") {
          // Case 1: Uncle is red
          node.parent.color = "black";
          uncle.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            // Case 2: Node is a right child and its parent is a left child
            node = node.parent;
            this._leftRotate(node);
          }

          // Case 3: Node is a left child and its parent is a left child
          node.parent.color = "black";
          node.parent.parent.color = "red";
          this._rightRotate(node.parent.parent);
        }
      } else {
        // Mirror cases for when the node's parent is a right child
        const uncle = node.parent.parent.left;
        if (uncle.color === "red") {
          // Case 1: Uncle is red
          node.parent.color = "black";
          uncle.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            // Case 2: Node is a left child and its parent is a right child
            node = node.parent;
            this._rightRotate(node);
          }

          // Case 3: Node is a right child and its parent is a right child
          node.parent.color = "black";
          node.parent.parent.color = "red";
          this._leftRotate(node.parent.parent);
        }
      }
    }

    this.root.color = "black";
  }

  // Perform a left rotation on a given node
  _leftRotate(node) {
    const rightChild = node.right;
    node.right = rightChild.left;
    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }
    rightChild.parent = node.parent;
    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    rightChild.left = node;
    node.parent = rightChild;
  }

  // Perform a right rotation on a given node
  _rightRotate(node) {
    const leftChild = node.left;
    node.left = leftChild.right;
    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }
    leftChild.parent = node.parent;
    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    leftChild.right = node;
    node.parent = leftChild;
  }

  // Search for a key in the tree and return its value
  search(key) {
    return this._search(key, this.root);
  }

  // Helper method to search for a key in the tree
  _search(key, currNode) {
    if (currNode === null) {
      return null;
    }
    if (key === currNode.key) {
      return currNode.value;
    } else if (key < currNode.key) {
      return this._search(key, currNode.left);
    } else {
      return this._search(key, currNode.right);
    }
  }

  // Print the tree in order (left, root, right)
  printInOrder() {
    this._printInOrder(this.root);
  }

  // Helper method to print the tree in order
  _printInOrder(node) {
    if (node !== null) {
      this._printInOrder(node.left);
      console.log(`Key: ${node.key}, Value: ${node.value}, Color: ${node.color}`);
      this._printInOrder(node.right);
    }
  }
}
