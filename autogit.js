class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(newNode, this.root);
    }
  }
_insertNode(newNode, currentNode) {
    if (newNode.value < currentNode.value) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this._insertNode(newNode, currentNode.left);
      }
    } else {
      if (currentNode.right === null) {
        currentNode.right = newNode;
      } else {
        this._insertNode(newNode, currentNode.right);
      }
    }
  }
search(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }
delete(value) {
    this.root = this._deleteNode(value, this.root);
  }
_deleteNode(value, currentNode) {
    if (currentNode === null) {
      return null;
    }
    if (value === currentNode.value) {
      // Case 1: No children
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }
      // Case 2: One child
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }
      // Case 3: Two children
      let successor = this._findSuccessor(currentNode);
      currentNode.value = successor.value;
      currentNode.right = this._deleteNode(successor.value, currentNode.right);
    } else if (value < currentNode.value) {
      currentNode.left = this._deleteNode(value, currentNode.left);
    } else {
      currentNode.right = this._deleteNode(value, currentNode.right);
    }
    return currentNode;
  }
