// Function to find the middle element of a linked list
function findMiddleElement(head) {
  if (head === null || head.next === null) {
    return head;
  }

  // Initialize two pointers, slow and fast
  let slow = head;
  let fast = head;

  // Move the slow pointer one step at a time
  // Move the fast pointer two steps at a time
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Return the slow pointer, which is now pointing to the middle element
  return slow;
}
