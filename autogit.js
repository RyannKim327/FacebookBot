const string = "Hello, world!";

// Check if the string contains the substring "world"
if (string.includes("world")) {
  console.log("The string contains the substring 'world'.");
} else {
  console.log("The string does not contain the substring 'world'.");
}
const string = "Hello, world!";

// Check if the string contains the substring "world"
if (string.indexOf("world") !== -1) {
  console.log("The string contains the substring 'world'.");
} else {
  console.log("The string does not contain the substring 'world'.");
}
const string = "Hello, world!";

// Check if the string contains the substring "world"
if (/world/.test(string)) {
  console.log("The string contains the substring 'world'.");
} else {
  console.log("The string does not contain the substring 'world'.");
}
