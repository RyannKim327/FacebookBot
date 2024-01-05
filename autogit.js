function hasCycle(head) {
  // Check if the linked list is empty
  if (!head) {
    return false;
  }

  // Initialize the slow and fast pointers
  let slow = head;
  let fast = head;

  // Move the pointers until they meet or the fast pointer reaches the end of the linked list
  while (slow !== null && fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    // If the slow and fast pointers meet, then there is a cycle
    if (slow === fast) {
      return true;
    }
  }

  // If the fast pointer reaches the end of the linked list, then there is no cycle
  return false;
}
