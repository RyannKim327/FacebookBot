// Node class for a red-black tree
class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.color = "red";
    }
}

// Red Black Tree class
class RedBlackTree {
    constructor() {
        this.root = null;
    }

    // Insert data into the red-black tree
    insert(data) {
        let newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
            this.root.color = "black";
        } else {
            let current = this.root;
            while (current) {
                if (data < current.data) {
                    if (current.left === null) {
                        current.left = newNode;
                        newNode.parent = current;
                        break;
                    }
                    current = current.left;
                } else {
                    if (current.right === null) {
                        current.right = newNode;
                        newNode.parent = current;
                        break;
                    }
                    current = current.right;
                }
            }
            this.fixTreeAfterInsertion(newNode);
        }
    }

    // Helper method to fix tree after insertion
    fixTreeAfterInsertion(node) {
        while (node.parent && node.parent.color === "red") {
            let parent = node.parent;
            let grandParent = node.parent.parent;

            if (parent === grandParent.left) {
                let uncle = grandParent.right;

                if (uncle && uncle.color === "red") {
                    parent.color = "black";
                    uncle.color = "black";
                    grandParent.color = "red";
                    node = grandParent;
                    continue;
                }

                if (node === parent.right) {
                    this.rotateLeft(parent);
                    node = parent;
                    parent = node.parent;
                }

                parent.color = "black";
                grandParent.color = "red";
                this.rotateRight(grandParent);
            } else {
                let uncle = grandParent.left;

                if (uncle && uncle.color === "red") {
                    parent.color = "black";
                    uncle.color = "black";
                    grandParent.color = "red";
                    node = grandParent;
                    continue;
                }

                if (node === parent.left) {
                    this.rotateRight(parent);
                    node = parent;
                    parent = node.parent;
                }

                parent.color = "black";
                grandParent.color = "red";
                this.rotateLeft(grandParent);
            }
        }

        this.root.color = "black";
    }

    // Rotate sub-tree left
    rotateLeft(node) {
        let pivot = node.right;
        node.right = pivot.left;

        if (pivot.left !== null) {
            pivot.left.parent = node;
        }

        pivot.parent = node.parent;

        if (node.parent === null) {
            this.root = pivot;
        } else if (node === node.parent.left) {
            node.parent.left = pivot;
        } else {
            node.parent.right = pivot;
        }

        pivot.left = node;
        node.parent = pivot;
    }

    // Rotate sub-tree right
    rotateRight(node) {
        let pivot = node.left;
        node.left = pivot.right;

        if (pivot.right !== null) {
            pivot.right.parent = node;
        }

        pivot.parent = node.parent;

        if (node.parent === null) {
            this.root = pivot;
        } else if (node === node.parent.right) {
            node.parent.right = pivot;
        } else {
            node.parent.left = pivot;
        }

        pivot.right = node;
        node.parent = pivot;
    }

    // Perform in-order traversal and return all elements
    inOrderTraversal(node) {
        let result = [];
        if (node !== null) {
            result = result.concat(this.inOrderTraversal(node.left));
            result.push(node.data);
            result = result.concat(this.inOrderTraversal(node.right));
        }
        return result;
    }

    // Search for a specific value in the red-black tree
    search(value) {
        let current = this.root;
        while (current !== null && current.data !== value) {
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return current ? true : false;
    }
}
// Create a new red-black tree
let tree = new RedBlackTree();

// Insert some values
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(1);
tree.insert(4);
tree.insert(6);
tree.insert(8);

// Perform in-order traversal
console.log(tree.inOrderTraversal(tree.root)); // Output: [1, 3, 4, 5, 6, 7, 8]

// Search for a value
console.log(tree.search(6)); // Output: true
console.log(tree.search(9)); // Output: false
