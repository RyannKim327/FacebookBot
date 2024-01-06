class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function findMiddleElement(head) {
  let slow = head;
  let fast = head;

  /* Traverse the list with two pointers, one moving at half the speed of the other */
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  /* By the time the fast pointer reaches the end of the list, the slow pointer will be at the middle */
  return slow.value;
}

/* Example usage */
const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);

console.log(findMiddleElement(list)); // Output: 3
