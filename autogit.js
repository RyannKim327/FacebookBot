// Function to find the middle element of a linked list
function findMiddle(head) {
  //  if the list is empty, return null
  if (head === null) {
    return null;
  }
  //  if the list has only one element, return the element
  if (head.next === null) {
    return head;
  }
  //  initialize two pointers, slow and fast, and set slow to the head
  let slow = head;
  let fast = head;
  //  traverse the linked list until the fast pointer reaches the end
  while (fast !== null && fast.next !== null) {
    //  move the slow pointer one node at a time
    slow = slow.next;
    //  move the fast pointer two nodes at a time
    fast = fast.next.next;
  }
  //  return the slow pointer, which is now pointing to the middle element
  return slow;
}
