class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
  }
}
insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this._insertNode(newNode, this.root);
  }

_insertNode(newNode, currentNode) {
    if (newNode.value < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = newNode;
      } else {
        this._insertNode(newNode, currentNode.left);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode;
      } else {
        this._insertNode(newNode, currentNode.right);
      }
    }
  }
search(value) {
    return this._searchNode(value, this.root);
  }

_searchNode(value, currentNode) {
    if (!currentNode) {
      return null;
    }
    if (value === currentNode.value) {
      return currentNode;
    } else if (value < currentNode.value) {
      return this._searchNode(value, currentNode.left);
    } else {
      return this._searchNode(value, currentNode.right);
    }
  }
remove(value) {
    this.root = this._removeNode(value, this.root);
  }

_removeNode(value, currentNode) {
    if (!currentNode) {
      return null;
    }
    if (value === currentNode.value) {
      // Case 1: Leaf node
      if (!currentNode.left && !currentNode.right) {
        return null;
      }
      // Case 2: Node with one child
      if (!currentNode.left) {
        return currentNode.right;
      } else if (!currentNode.right) {
        return currentNode.left;
      }
      // Case 3: Node with two children
      const successor = this._findMinNode(currentNode.right);
      currentNode.value = successor.value;
      currentNode.right = this._removeNode(successor.value, currentNode.right);
      return currentNode;
    } else if (value < currentNode.value) {
      currentNode.left = this._removeNode(value, currentNode.left);
      return currentNode;
    } else {
      currentNode.right = this._removeNode(value, currentNode.right);
      return currentNode;
    }
  }

_findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
inOrder() {
    this._inOrderTraversal(this.root);
  }

_inOrderTraversal(node) {
    if (!node) {
      return;
    }
    this._inOrderTraversal(node.left);
    console.log(node.value);
    this._inOrderTraversal(node.right);
  }

preOrder() {
    this._preOrderTraversal(this.root);
  }

_preOrderTraversal(node) {
    if (!node) {
      return;
    }
    console.log(node.value);
    this._preOrderTraversal(node.left);
    this._preOrderTraversal(node.right);
  }

postOrder() {
    this._postOrderTraversal(this.root);
  }

_postOrderTraversal(node) {
    if (!node) {
      return;
    }
    this._postOrderTraversal(node.left);
    this._postOrderTraversal(node.right);
    console.log(node.value);
  }
