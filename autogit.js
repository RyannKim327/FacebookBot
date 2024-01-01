function binarySearch(arr, target, start = 0, end = arr.length - 1) {
    if (start > end) {
        return -1;
    }

    const middle = Math.floor((start + end) / 2);

    if (arr[middle] === target) {
        return middle;
    }

    if (arr[middle] > target) {
        return binarySearch(arr, target, start, middle - 1);
    }

    return binarySearch(arr, target, middle + 1, end);
}
