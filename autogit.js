// Function to find the middle element of a linked list
const findMiddleElement = (head) => {
  // Check if the linked list is empty
  if (head === null) {
    return null;
  }

  // Initialize two pointers: slow and fast
  let slow = head;
  let fast = head;

  // Move the slow pointer one node at a time, and the fast pointer two nodes at a time
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Return the slow pointer, which will be pointing to the middle element of the linked list
  return slow;
};
