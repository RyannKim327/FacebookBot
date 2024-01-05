function insertionSort(array) {
  for (var i = 1; i < array.length; i++) {
    var currentValue = array[i];
    var j = i - 1;
    while (j >= 0 && currentValue < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentValue;
  }
  return array;
}
