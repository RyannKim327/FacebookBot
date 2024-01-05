class Stack {
  constructor() {
    this.stackArray = [];
  }

  // add element to the top of the stack
  push(element) {
    this.stackArray.push(element);
  }

  // remove and return element from the top of the stack
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty.";
    }
    return this.stackArray.pop();
  }

  // check if the stack is empty
  isEmpty() {
    return this.stackArray.length === 0;
  }

  // returns the size or number of elements in the stack
  size() {
    return this.stackArray.length;
  }

  // returns the top element of the stack without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty.";
    }
    return this.stackArray[this.stackArray.length - 1];
  }

  // clear the stack
  clear() {
    this.stackArray = [];
  }
}

// Example usage:
const stack = new Stack();

console.log(stack.isEmpty()); // true

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.size()); // 3
console.log(stack.peek()); // 30

console.log(stack.pop()); // 30
console.log(stack.size()); // 2

stack.clear();
console.log(stack.isEmpty()); // true
