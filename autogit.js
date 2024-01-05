class Stack {
  constructor() {
    this.items = [];
  }

  // Adds an element to the top of the stack
  push(element) {
    this.items.push(element);
  }

  // Removes and returns the top element of the stack
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  // Returns the top element of the stack without removing it
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  // Returns true if the stack is empty, false otherwise
  isEmpty() {
    return this.items.length === 0;
  }

  // Returns the size of the stack
  size() {
    return this.items.length;
  }

  // Prints the contents of the stack
  printStack() {
    console.log(this.items);
  }
}

// Example usage:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack: ");
stack.printStack();
console.log("Top element:", stack.peek());
console.log("Popped element:", stack.pop());
console.log("Stack: ");
stack.printStack();
