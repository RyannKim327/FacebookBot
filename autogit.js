const removeVowels = (string) => {
  const vowels = "aeiouAEIOU";
  return string.replace(/[aeiouAEIOU]/g, "");
};
const removeVowels = (string) => {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (/[aeiouAEIOU]/.test(char)) {
      continue; 
    }
    newString += char;
  }
  return newString;
};
const removeVowels = (string) => {
  return string.split(/[aeiouAEIOU]/g).join("");
};
const removeVowels = (string) => {
  return string.split("").filter((char) => {
    return !/[aeiouAEIOU]/.test(char);
  }).join("");
};
const removeVowels = (string) => {
  return string.replace(/[aeiouAEIOU]/g, "");
};
