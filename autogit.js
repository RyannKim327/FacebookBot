function radixSort(nums, maxDigit) {
    let exponent = 1;
    while (maxDigit / exponent >= 1) {
        countingSort(nums, exponent);
        exponent *= 10;
    }
}

function countingSort(nums, exponent) {
    const n = nums.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) {
        const index = Math.floor(nums[i] / exponent) % 10;
        count[index]++;
    }
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(nums[i] / exponent) % 10;
        output[count[index] - 1] = nums[i];
        count[index]--;
    }
    for (let i = 0; i < n; i++) {
        nums[i] = output[i];
    }
}

// Example usage:
const nums = [170, 45, 75, 90, 802, 24, 2, 66];
const maxDigit = 802;
radixSort(nums, maxDigit);
console.log(nums); // Output: [2, 24, 45, 66, 75, 90, 170, 802]
