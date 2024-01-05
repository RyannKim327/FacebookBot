class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Method to reverse the linked list
  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;

    while (current !== null) {
      // Store the next node
      next = current.next;
      // Change next pointer of current node to the previous node
      current.next = prev;
      // Move prev and current one step forward
      prev = current;
      current = next;
    }
    // Set the new head as the last prev node
    this.head = prev;
  }

  // Method to insert elements at the beginning of the linked list
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Method to print the linked list
  printList() {
    let currentNode = this.head;
    let listString = "";

    while (currentNode) {
      listString += currentNode.data + " -> ";
      currentNode = currentNode.next;
    }

    listString += "null";
    console.log(listString);
  }
}

// Example usage:
const linkedList = new LinkedList();
linkedList.insertAtBeginning(3);
linkedList.insertAtBeginning(2);
linkedList.insertAtBeginning(1);

console.log("Original linked list:");
linkedList.printList();

linkedList.reverse();

console.log("Reversed linked list:");
linkedList.printList();
