class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  reverse() {
    const reversedList = [];
    let current = this.head;
    while (current !== null) {
      reversedList.unshift(current.data);
      current = current.next;
    }

    const newHead = new Node(reversedList[0]);
    let newCurrent = newHead;
    for (let i = 1; i < reversedList.length; i++) {
      const newNode = new Node(reversedList[i]);
      newCurrent.next = newNode;
      newCurrent = newCurrent.next;
    }

    this.head = newHead;
    this.size = reversedList.length;
  }

  print() {
    let current = this.head;
    let output = "";
    while (current !== null) {
      output += current.data + " ";
      current = current.next;
    }
    console.log(output);
  }
}

const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

console.log("Original list:");
list.print();

list.reverse();

console.log("Reversed list:");
list.print();
Original list:
1 2 3 4 5

Reversed list:
5 4 3 2 1
