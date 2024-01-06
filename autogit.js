function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Found a cycle
    }
  }

  return false; // No cycle found
}
// Sample linked list with a cycle
const node1 = { value: 1 };
const node2 = { value: 2 };
const node3 = { value: 3 };
const node4 = { value: 4 };
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // Cycle from node4 to node2

console.log(hasCycle(node1)); // Output: true
