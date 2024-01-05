function isPalindrome(head) {
  // Find the middle node of the linked list
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the linked list
  let reversedHead = null;
  while (slow) {
    const next = slow.next;
    slow.next = reversedHead;
    reversedHead = slow;
    slow = next;
  }

  // Compare the first half and the second half of the linked list
  let firstHalf = head;
  let secondHalf = reversedHead;
  while (firstHalf && secondHalf) {
    if (firstHalf.val !== secondHalf.val) {
      return false;
    }
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  // Restore the original linked list
  slow = reversedHead;
  reversedHead = null;
  while (slow) {
    const next = slow.next;
    slow.next = reversedHead;
    reversedHead = slow;
    slow = next;
  }

  // Return the result
  return true;
}
