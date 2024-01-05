class Node {
  constructor(keys, children) {
    this.keys = keys || [];
    this.children = children || [];
  }
}

class BTree {
  constructor(order) {
    this.root = new Node();
    this.order = order;
  }

  insert(key, value) {
    let node = this.root;
    while (true) {
      const index = node.keys.findIndex(k => k >= key);
      if (index >= 0) {
        // Key already exists, update value
        node.children[index].value = value;
        return;
      }
      if (node.children.length === 0) {
        // Leaf node, insert key-value pair
        node.keys.push(key);
        node.children.push({ key, value });
        return;
      } else {
        node = node.children[index];
      }
    }
  }
}
