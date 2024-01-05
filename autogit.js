class Stack {
    constructor() {
        this.stack = [];
    }

    // Adds an element to the top of the stack
    push(element) {
        this.stack.push(element);
    }

    // Removes and returns the top element from the stack
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.stack.pop();
    }

    // Returns the top element of the stack without removing it
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.stack[this.stack.length - 1];
    }

    // Returns true if the stack is empty, false otherwise
    isEmpty() {
        return this.stack.length === 0;
    }

    // Returns the size of the stack
    size() {
        return this.stack.length;
    }
}

// Example usage:
const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.pop()); // Output: 30
console.log(stack.peek()); // Output: 20
console.log(stack.size()); // Output: 2
console.log(stack.isEmpty()); // Output: false
