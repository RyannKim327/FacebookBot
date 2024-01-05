function findLength(string) {
  let length = 0;
  for (let i = 0; i < string.length; i++) {
    length++;
  }
  return length;
}
function findLength(string) {
  if (string === "") {
    return 0;
  }
  return 1 + findLength(string.slice(1));
}
function findLength(string) {
  return string.split("").reduce((acc, _) => acc + 1, 0);
}
