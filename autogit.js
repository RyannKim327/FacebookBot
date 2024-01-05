// Function to find the nth node from the end of a linked list
// head: head of the linked list
// n: nth node from the end to find
function findNthNodeFromEnd(head, n) {
  // If the list is empty or n is invalid, return null
  if (head === null || n < 1) {
    return null;
  }

  // Initialize two pointers, one to traverse the list and the other to lag behind by n nodes
  let current = head;
  let nthNode = head;

  // Move the current pointer forward by n nodes
  for (let i = 0; i < n; i++) {
    if (current.next === null) {
      // If the current pointer reaches the end of the list before moving forward n nodes, then the list is smaller than n, so return null
      return null;
    }
    current = current.next;
  }

  // Now, move both pointers forward together until the current pointer reaches the end of the list
  while (current.next !== null) {
    current = current.next;
    nthNode = nthNode.next;
  }

  // Return the nth node from the end
  return nthNode;
}
