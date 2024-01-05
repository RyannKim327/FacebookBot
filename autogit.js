class Node {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.children = {};
    this.suffix_link = null;
    this.suffix_index = -1;
  }
}

class SuffixTree {
  constructor() {
    this.root = null;
  }

  build(input) {
    this.root = new Node(-1, -1);
    let last_created_node = null;

    for (let i = 0; i < input.length; i++) {
      const suffix = input.substring(i);
      let current_node = this.root;
      let j = i;

      while (j < input.length) {
        if (current_node.children[input[j]]) {
          const child = current_node.children[input[j]];
          let k = child.start;

          // Traverse the tree for matching characters
          while (k <= child.end && input[k] === input[j]) {
            k++;
            j++;
          }

          if (k <= child.end) {
            // Split the child node
            const split_node = new Node(child.start, k - 1);
            current_node.children[input[j - 1]] = split_node;
            split_node.children[input[k]] = child;
            child.start = k;
            current_node = split_node;

            if (last_created_node) {
              last_created_node.suffix_link = current_node;
            }
            last_created_node = current_node;
          } else {
            current_node = child;
          }
        } else {
          // Add a new node and insert it as a child
          const new_node = new Node(j, input.length - 1);
          current_node.children[input[j]] = new_node;

          if (last_created_node) {
            last_created_node.suffix_link = current_node;
          }
          last_created_node = current_node;
          break;
        }
      }
    }

    // Set the suffix indexes
    this.setSuffixIndexes(this.root, 0);

    // Set the suffix links
    this.setSuffixLinks(this.root);
  }

  setSuffixIndexes(node, depth) {
    if (!node) return;

    const is_leaf = Object.keys(node.children).length === 0;
    if (is_leaf) {
      node.suffix_index = node.start - depth;
      return;
    }

    for (const child of Object.values(node.children)) {
      this.setSuffixIndexes(child, depth + (child.end - child.start + 1));
    }
  }

  setSuffixLinks(node) {
    if (!node) return;

    for (const child of Object.values(node.children)) {
      child.suffix_link = this.findSuffixLink(child);
      this.setSuffixLinks(child);
    }
  }
  
  findSuffixLink(node) {
    if (node === this.root) return this.root;
    
    let current_node = node.suffix_link.parent;
    const start_index = node.suffix_link.start;
    const end_index = node.suffix_link.end;
    const suffix_length = end_index - start_index + 1;

    while (suffix_length < node.end - node.start + 1) {
      const next_char = input[node.start + suffix_length];

      if (current_node.children[next_char]) {
        return current_node.children[next_char];
      }

      current_node = current_node.suffix_link;
    }

    return current_node;
  }

  search(query) {
    let current_node = this.root;
  
    for (let i = 0; i < query.length; i++) {
      const char = query[i];
  
      if (!current_node.children[char]) {
        return false;
      }
  
      current_node = current_node.children[char];
    }
  
    return true;
  }
}

// Example usage:
const suffixTree = new SuffixTree();
suffixTree.build("banana");
console.log(suffixTree.search("ana")); // true
console.log(suffixTree.search("nan")); // true
console.log(suffixTree.search("foo")); // false
