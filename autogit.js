function hasCycle(head) {
  // Create a Set to store visited nodes.
  const visited = new Set();

  // Initialize a pointer to traverse the linked list.
  let current = head;

  // While the current node is not null, keep traversing.
  while (current) {
    // Check if the current node is already in the Set.
    if (visited.has(current)) {
      // If the current node is in the Set, it means there is a cycle.
      return true;
    }

    // Add the current node to the Set.
    visited.add(current);

    // Move to the next node.
    current = current.next;
  }

  // If the traversal completes without encountering a cycle, return false.
  return false;
}
function hasCycle(head) {
  // Initialize slow and fast pointers to the head of the list.
  let slow = head;
  let fast = head;

  // While both pointers are not null, keep traversing.
  while (slow && fast && fast.next) {
    // Move the slow pointer one node at a time.
    slow = slow.next;

    // Move the fast pointer two nodes at a time.
    fast = fast.next.next;

    // If the fast pointer catches up to the slow pointer, it means there is a cycle.
    if (slow === fast) {
      return true;
    }
  }

  // If the traversal completes without the pointers meeting, there is no cycle.
  return false;
}
