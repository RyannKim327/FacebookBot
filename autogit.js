class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function isPalindrome(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isLinkedListPalindrome(head) {
  let node = head;
  const values = [];

  while (node) {
    values.push(node.val);
    node = node.next;
  }

  return isPalindrome(values);
}

// Example usage:
// Create a linked list: 1 -> 2 -> 3 -> 2 -> 1
const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(2);
list.next.next.next.next = new ListNode(1);

console.log(isLinkedListPalindrome(list)); // true
