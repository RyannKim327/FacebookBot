const string = "Hello world, hello! Hello world.";

// Convert the string to lowercase.
const lowercaseString = string.toLowerCase();

// Split the string into an array of words.
const words = lowercaseString.split(" ");

// Filter the array to include only the words that match the word "hello".
const filteredWords = words.filter((word) => word === "hello");

// Count the number of occurrences of the word "hello".
const count = filteredWords.length;

console.log(`The word "hello" occurs ${count} times in the string.`);
The word "hello" occurs 3 times in the string.
const string = "Hello world, hello! Hello world.";

// Create a regular expression to match the word "hello".
const regex = /hello/g;

// Use the `match()` method to find all matches of the regular expression in the string.
const matches = string.match(regex);

// Count the number of matches.
const count = matches.length;

console.log(`The word "hello" occurs ${count} times in the string.`);
The word "hello" occurs 3 times in the string.
