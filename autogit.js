class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function countLeafNodes(node) {
    if (node === null) {
        return 0;
    } else if (node.left === null && node.right === null) {
        // Leaf node
        return 1;
    } else {
        // Recursive calls for left and right subtrees
        return countLeafNodes(node.left) + countLeafNodes(node.right);
    }
}

// Example usage
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.right.right = new Node(7);

const leafNodeCount = countLeafNodes(root);
console.log("Number of leaf nodes:", leafNodeCount);
