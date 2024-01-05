function binarySearchRecursive(arr, target, start, end) {
    if (start > end) {
        return false;
    }

    const middle = Math.floor((start + end) / 2);

    if (arr[middle] === target) {
        return true;
    }
    else if (arr[middle] > target) {
        return binarySearchRecursive(arr, target, start, middle - 1);
    }
    else {
        return binarySearchRecursive(arr, target, middle + 1, end);
    }
}

// Example usage:
const array = [1, 3, 5, 7, 9];
const targetNumber = 7;
console.log(binarySearchRecursive(array, targetNumber, 0, array.length - 1)); // Output: true
