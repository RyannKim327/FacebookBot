// Function to convert decimal to binary
function dec2bin(decimal) {
  // Check if the decimal is valid
  if (decimal < 0 || decimal > 255) {
    throw new Error("Decimal number must be between 0 and 255");
  }

  var binary = "";  // Variable to store the binary representation

  // Loop until the decimal is 0
  while (decimal > 0) {
    // Check if the decimal is even
    if (decimal % 2 == 0) {
      binary += "0";
    } else {
      binary += "1";
    }

    // Divide the decimal by 2 to get the next bit
    decimal = Math.floor(decimal / 2);
  }

  // Reverse the binary string
  binary = binary.split("").reverse().join("");

  return binary;
}
