class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const isPalindrome = (head) => {
  if (!head || !head.next) {
    return true; // an empty list or single node is a palindrome
  }

  // Find the middle of the linked list
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the linked list
  let reversed = reverseLinkedList(slow);

  // Compare the reversed second half with the first half
  while (reversed) {
    if (head.val !== reversed.val) {
      return false; // not a palindrome
    }
    head = head.next;
    reversed = reversed.next;
  }

  return true; // it is a palindrome
};

const reverseLinkedList = (head) => {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev; // new head of the reversed list
};
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(2);
const node5 = new ListNode(1);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

console.log(isPalindrome(node1)); // Output: true
