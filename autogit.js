class BTreeNode {
  constructor(order, leaf = false) {
    this.order = order; // maximum number of keys
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }

  insert(key) {
    let idx = this.keys.findIndex((k) => key < k);
    if (idx === -1) idx = this.keys.length;
    this.keys.splice(idx, 0, key);
  }

  splitChild(index) {
    const right = new BTreeNode(this.order, this.children[index].leaf);

    const left = this.children[index];
    right.keys = left.keys.splice(Math.ceil(this.order / 2));
    right.children = left.children.splice(Math.ceil((this.order + 1) / 2));

    this.keys.splice(index, 0, left.keys.pop());
    this.children.splice(index + 1, 0, right);
  }
}
class BTree {
  constructor(order) {
    this.root = new BTreeNode(order, true);
    this.order = order;
  }

  search(key, node = this.root) {
    let idx = node.keys.findIndex((k) => key === k);
    if (idx !== -1) return true;
    if (node.leaf) return false;
    idx = node.keys.findIndex((k) => key < k);
    if (idx === -1) idx = node.keys.length;
    return this.search(key, node.children[idx]);
  }

  insert(key, node = this.root) {
    if (node.keys.includes(key)) return; // Prevent duplicates
    if (node.leaf) {
      node.insert(key);
      if (node.keys.length > this.order - 1) this.split(node);
    } else {
      const idx = node.keys.findIndex((k) => key < k);
      if (idx === -1) node.children[node.keys.length].insert(key);
      else node.children[idx].insert(key);

      if (node.children[idx] && node.children[idx].keys.length > this.order - 1) {
        this.split(node.children[idx]);
      }
    }
  }

  split(node) {
    const mid = Math.floor(node.keys.length / 2);
    const parent = node === this.root ? new BTreeNode(this.order) : node.parent;
    parent.insert(node.keys[mid]);

    if (node.leaf) {
      const right = new BTreeNode(this.order, true);
      right.keys = node.keys.splice(mid + 1);
      parent.children = [node, right];
    } else {
      const right = new BTreeNode(this.order, false);
      right.keys = node.keys.splice(mid + 1);
      right.children = node.children.splice(mid + 1);
      parent.children.splice(parent.keys.findIndex((k) => node.keys[mid] < k) + 1, 0, right);
      right.parent = parent;
    }

    if (this.root === node) {
      this.root = parent;
    } else if (parent.keys.length > this.order - 1) {
      this.split(parent);
    }
  }
}
const btree = new BTree(3);

btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(15);

console.log(btree.search(15)); // Output: true
console.log(btree.search(25)); // Output: false
