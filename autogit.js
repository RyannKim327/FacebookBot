class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
  }
}
BinaryTree.prototype.insert = function(data) {
  const newNode = new Node(data);
  if (this.root === null) {
    this.root = newNode;
  } else {
    this._insertNode(newNode, this.root);
  }
};

BinaryTree.prototype._insertNode = function(newNode, currentNode) {
  if (newNode.data < currentNode.data) {
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
};
BinaryTree.prototype.search = function(data) {
  return this._searchNode(data, this.root);
};

BinaryTree.prototype._searchNode = function(data, currentNode) {
  if (currentNode === null) {
    return false;
  }
  if (data === currentNode.data) {
    return true;
  } else if (data < currentNode.data) {
    return this._searchNode(data, currentNode.left);
  } else {
    return this._searchNode(data, currentNode.right);
  }
};
BinaryTree.prototype.delete = function(data) {
  this.root = this._deleteNode(data, this.root);
};

BinaryTree.prototype._deleteNode = function(data, currentNode) {
  if (currentNode === null) {
    return null;
  }
  if (data === currentNode.data) {
    if (currentNode.left === null && currentNode.right === null) {
      return null;
    } else if (currentNode.left === null) {
      return currentNode.right;
    } else if (currentNode.right === null) {
      return currentNode.left;
    } else {
      const successor = this._findSuccessor(currentNode);
      currentNode.data = successor.data;
      currentNode.right = this._deleteNode(successor.data, currentNode.right);
      return currentNode;
    }
  } else if (data < currentNode.data) {
    currentNode.left = this._deleteNode(data, currentNode.left);
    return currentNode;
  } else {
    currentNode.right = this._deleteNode(data, currentNode.right);
    return currentNode;
  }
};

BinaryTree.prototype._findSuccessor = function(currentNode) {
  let successor = currentNode.right;
  while (successor.left !== null) {
    successor = successor.left;
  }
  return successor;
};
BinaryTree.prototype.inOrderTraversal = function(callback) {
  this._inOrderTraversal(callback, this.root);
};

BinaryTree.prototype._inOrderTraversal = function(callback, currentNode) {
  if (currentNode === null) {
    return;
  }
  this._inOrderTraversal(callback, currentNode.left);
  callback(currentNode.data);
  this._inOrderTraversal(callback, currentNode.right);
};

BinaryTree.prototype.preOrderTraversal = function(callback) {
  this._preOrderTraversal(callback, this.root);
};

BinaryTree.prototype._preOrderTraversal = function(callback, currentNode) {
  if (currentNode === null) {
    return;
  }
  callback(currentNode.data);
  this._preOrderTraversal(callback, currentNode.left);
  this._preOrderTraversal(callback, currentNode.right);
};

BinaryTree.prototype.postOrderTraversal = function(callback) {
  this._postOrderTraversal(callback, this.root);
};

BinaryTree.prototype._postOrderTraversal = function(callback, currentNode) {
  if (currentNode === null) {
    return;
  }
  this._postOrderTraversal(callback, currentNode.left);
  this._postOrderTraversal(callback, currentNode.right);
  callback(currentNode.data);
};
BinaryTree.prototype.printTree = function() {
  this._printTree(this.root);
};

BinaryTree.prototype._printTree = function(currentNode) {
  if (currentNode === null) {
    return;
  }
  console.log(currentNode.data);
  this._printTree(currentNode.left);
  this._printTree(currentNode.right);
};
