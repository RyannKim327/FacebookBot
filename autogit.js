function isPalindrome(head) {
  if (head === null || head.next === null) {
    return true;
  }

  // Reverse the linked list
  let reversedHead = reverseList(head);

  // Traverse the original and reversed lists simultaneously
  let originalCurrent = head;
  let reversedCurrent = reversedHead;

  // Compare the data of corresponding nodes
  while (originalCurrent !== null && reversedCurrent !== null) {
    if (originalCurrent.data !== reversedCurrent.data) {
      return false;
    }

    originalCurrent = originalCurrent.next;
    reversedCurrent = reversedCurrent.next;
  }

  // If all corresponding nodes have the same data, the linked list is a palindrome
  return true;
}

function reverseList(head) {
  let previousNode = null;
  let currentNode = head;
  let nextNode;

  while (currentNode !== null) {
    nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  return previousNode;
}
