/*
Given a linked list, find the nth node from the end of the list.

Example:
Input: [1, 2, 3, 4, 5], n = 2
Output: 4

Strategy:
1. Find the length of the linked list.
2. Subtract n from the length to find the index of the nth node from the end.
3. Traverse the linked list from the beginning, stopping at the index found in step 2.
4. Return the node at the index found in step 3.
*/
const findNthNodeFromEnd = (head, n) => {
  // If the linked list is empty or n is invalid, return null.
  if (!head || n <= 0) {
    return null;
  }

  // Find the length of the linked list.
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  // Subtract n from the length to find the index of the nth node from the end.
  const index = length - n;

  // Traverse the linked list from the beginning, stopping at the index found in step 2.
  current = head;
  for (let i = 0; i < index; i++) {
    current = current.next;
  }

  // Return the node at the index found in step 3.
  return current;
};
