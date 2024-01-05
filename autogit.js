class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null; // Initialize the head to null
  }

  // Function to insert a node at the end of the linked list
  insertNode(data) {
    // Create a new node with the given data
    const newNode = new Node(data);

    // If the linked list is empty, make the new node the head
    if (!this.head) {
      this.head = newNode;
    } else {
      // Traverse the linked list until we reach the last node
      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      // Insert the new node at the end of the linked list
      current.next = newNode;
    }
  }

  // Function to calculate the length of the linked list
  getLength() {
    // Initialize a counter variable to 0
    let count = 0;

    // If the linked list is empty, return 0
    if (!this.head) {
      return count;
    }

    // Traverse the linked list and increment the counter for each node
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }

    // Return the length of the linked list
    return count;
  }
}

// Create a linked list
const linkedList = new LinkedList();

// Insert some nodes into the linked list
linkedList.insertNode(1);
linkedList.insertNode(2);
linkedList.insertNode(3);
linkedList.insertNode(4);
linkedList.insertNode(5);

// Get the length of the linked list
const length = linkedList.getLength();

// Print the length of the linked list
console.log("Length of the linked list:", length); // Output: Length of the linked list: 5
