/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * Finds the intersection of two linked lists.
 *
 * @param {ListNode} head1 The head of the first linked list.
 * @param {ListNode} head2 The head of the second linked list.
 * @return {ListNode} The intersection node, or null if there is no intersection.
 */
const getIntersectionNode = (head1, head2) => {
  // Create a set to store the nodes in the first linked list.
  const nodeSet = new Set();

  // Iterate over the first linked list and add each node to the set.
  let current = head1;
  while (current !== null) {
    nodeSet.add(current);
    current = current.next;
  }

  // Iterate over the second linked list and check if any node is in the set.
  current = head2;
  while (current !== null) {
    if (nodeSet.has(current)) {
      return current;
    }
    current = current.next;
  }

  // If no intersection was found, return null.
  return null;
};
