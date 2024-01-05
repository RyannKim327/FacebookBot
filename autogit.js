// Function to find the middle element of a linked list.
function findMiddleElement(head) {
  // If the linked list is empty, return null.
  if (head === null) {
    return null;
  }

  // Initialize two pointers: slow and fast.
  let slow = head;
  let fast = head;

  // Move the fast pointer two steps at a time while the slow pointer moves one step at a time.
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Return the middle element.
  return slow;
}
