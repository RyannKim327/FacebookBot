class Node {
  constructor(order, keys = [], children = []) {
    this.order = order;
    this.keys = keys;
    this.children = children;
  }
}
class BTree {
  constructor(order) {
    this.order = order;
    this.root = new Node(order);
  }
}
insert(key) {
  this._insertKey(key, this.root);
}

_insertKey(key, node) {
  if (node.keys.length < this.order - 1) {
    this._insertKeyIntoNode(key, node);
  } else {
    this._splitNode(key, node);
  }
}
_splitNode(key, node) {
  const medianKeyIndex = Math.floor(this.order / 2) - 1;
  
  const newRightNodeKeys = node.keys.slice(medianKeyIndex + 1);
  const newRightNodeChildren = node.children.slice(medianKeyIndex + 1);
  
  node.keys = node.keys.slice(0, medianKeyIndex + 1);
  node.children = node.children.slice(0, medianKeyIndex + 2);
  
  const newRightNode = new Node(this.order, newRightNodeKeys, newRightNodeChildren);
  
  const parentNode = node.parent;
  if (parentNode) {
    this._insertKeyIntoNode(key, parentNode);
  } else {
    this.root = new Node(this.order, [key], [node, newRightNode]);
  }
}
search(key) {
  return this._searchKey(key, this.root);
}

_searchKey(key, node) {
  let index = node.keys.indexOf(key);
  if (index !== -1) {
    return node;
  }
  for (let i = 0; i < node.keys.length; i++) {
    if (key < node.keys[i]) {
      return this._searchKey(key, node.children[i]);
    }
  }
  return this._searchKey(key, node.children[node.children.length - 1]);
}
delete(key) {
  this._deleteKey(key, this.root);
}

_deleteKey(key, node) {
  let index = node.keys.indexOf(key);
  if (index !== -1) {
    this._deleteKeyFromNode(key, node);
  } else {
    for (let i = 0; i < node.keys.length; i++) {
      if (key < node.keys[i]) {
        this._deleteKey(key, node.children[i]);
        break;
      }
    }
    if (i === node.keys.length) {
      this._deleteKey(key, node.children[node.children.length - 1]);
    }
  }
}
_mergeNodes(leftNode, rightNode) {
  leftNode.keys.push(...rightNode.keys);
  leftNode.children.push(...rightNode.children);
  
  const parentNode = rightNode.parent;
  const index = parentNode.children.indexOf(rightNode);
  parentNode.children.splice(index, 1);
  
  if (parentNode.keys.length < this.order - 1) {
    this._mergeKeys(parentNode, leftNode);
  } else {
    this._balanceNode(parentNode);
  }
}
_balanceNode(node) {
  const leftSibling = node.getLeftSibling();
  const rightSibling = node.getRightSibling();
  
  if (leftSibling && leftSibling.keys.length > this.order - 1) {
    this._redistributeKeys(leftSibling, node);
  } else if (rightSibling && rightSibling.keys.length > this.order - 1) {
    this._redistributeKeys(node, rightSibling);
  } else {
    this._mergeNodes(leftSibling, node);
  }
}
_redistributeKeys(leftNode, rightNode) {
  const medianKeyIndex = Math.floor(this.order / 2) - 1;
  
  leftNode.keys.push(rightNode.keys[0]);
  rightNode.keys = rightNode.keys.slice(1);
  
  if (leftNode.children.length < this.order) {
    leftNode.children.push(rightNode.children[0]);
    rightNode.children = rightNode.children.slice(1);
  }
}
