function isPalindrome(str) {
  // Convert the string to lowercase and remove spaces
  str = str.toLowerCase().replace(/\s/g, "");

  // Check if the string is empty
  if (str === "") {
    return true;
  }

  // Check if the first and last characters are the same
  if (str[0] !== str[str.length - 1]) {
    return false;
  }

  // Recursively check the remaining characters
  return isPalindrome(str.substring(1, str.length - 1));
}
