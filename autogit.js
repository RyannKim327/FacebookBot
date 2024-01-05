function longestIncreasingSubsequence(arr) {
  const lis = new Array(arr.length).fill(1);
  let maxLen = 1;

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        lis[i] = Math.max(lis[i], lis[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, lis[i]);
  }

  const result = [];
  let prevLen = maxLen;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (lis[i] === prevLen) {
      result.unshift(arr[i]);
      prevLen--;
    }
  }

  return result;
}
