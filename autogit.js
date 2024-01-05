function findIntersection(headA, headB) {
  if (headA === null || headB === null) {
    return null;
  }

  let pointer1 = headA;
  let pointer2 = headB;

  while (pointer1 !== pointer2) {
    pointer1 = pointer1 === null ? headB : pointer1.next;
    pointer2 = pointer2 === null ? headA : pointer2.next;
  }

  return pointer1;
}
