class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  let next = null;

  while (current !== null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// Example usage:
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;

console.log("Original linked list:");
let current = node1;
while (current !== null) {
  console.log(current.value);
  current = current.next;
}

const reversed = reverseLinkedList(node1);
console.log("Reversed linked list:");
current = reversed;
while (current !== null) {
  console.log(current.value);
  current = current.next;
}
