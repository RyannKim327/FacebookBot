class SkipList {
  constructor() {
    this.head = {
      value: -Infinity,
      next: null,
    };
    this.maxLevel = 1;
  }

  // other methods will be added here
}
class Node {
  constructor(value, level) {
    this.value = value;
    this.next = new Array(level).fill(null);
  }
}
class SkipList {
  // ...

  insert(value) {
    const level = this.getRandomLevel(); // generate level for new node
    const newNode = new Node(value, level);

    while (this.maxLevel < level) {
      // update maximum level if necessary
      this.maxLevel++;
    }

    let currentLevel = this.maxLevel - 1;
    let currentNode = this.head;

    while (currentLevel >= 0) {
      if (
        !currentNode.next[currentLevel] ||
        currentNode.next[currentLevel].value > value
      ) {
        // insert new node at this level
        if (currentLevel < level) {
          newNode.next[currentLevel] = currentNode.next[currentLevel]; // update references
          currentNode.next[currentLevel] = newNode;
        }

        currentLevel--; // move to the next level down
      } else {
        // move forward on this level
        currentNode = currentNode.next[currentLevel];
      }
    }
  }

  getRandomLevel() {
    let level = 1;
    while (Math.random() < 0.5 && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  // other methods will be added here
}
