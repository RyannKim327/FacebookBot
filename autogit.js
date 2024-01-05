/*
Given two sorted arrays, find the median of the two arrays.

Median is the middle number of a sorted list of numbers.
If there are two middle numbers, the median is the average of the two.

For example, the median of [1,2,3] is 2.
The median of [1,2,3,4] is (2+3)/2 = 2.5.

Input:
two sorted arrays

Output:
the median of the two arrays

Example:
Input: [1,3,5,7,9], [2,4,6]
Output: 4

Algorithm:
1. Merge the two arrays into one sorted array.
2. Find the middle index of the merged array.
3. If the middle index is even, the median is the average of the two numbers at the middle index and the middle index - 1.
4. If the middle index is odd, the median is the number at the middle index.

Complexity:
Time complexity: O(m + n), where m and n are the lengths of the two arrays.
Space complexity: O(m + n), where m and n are the lengths of the two arrays.
*/
const findMedian = (arr1, arr2) => {
  // Merge the two arrays into one sorted array.
  const mergedArr = arr1.concat(arr2).sort((a, b) => a - b);

  // Find the middle index of the merged array.
  const middleIndex = Math.floor(mergedArr.length / 2);

  // If the middle index is even, the median is the average of the two numbers at the middle index and the middle index - 1.
  if (mergedArr.length % 2 === 0) {
    return (mergedArr[middleIndex] + mergedArr[middleIndex - 1]) / 2;
  }

  // If the middle index is odd, the median is the number at the middle index.
  else {
    return mergedArr[middleIndex];
  }
};

// Example:
console.log(findMedian([1, 3, 5, 7, 9], [2, 4, 6])); // 4
