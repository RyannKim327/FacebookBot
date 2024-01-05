const hashTable = {};
const hashFunction = (key) => {
  const stringKey = key.toString();
  const hash = stringKey.charCodeAt(0) % hashTable.length;
  return hash;
};
const addKeyValuePair = (key, value) => {
  const hash = hashFunction(key);
  hashTable[hash] = value;
};
const getValue = (key) => {
  const hash = hashFunction(key);
  return hashTable[hash];
};
const hasKey = (key) => {
  const hash = hashFunction(key);
  return hashTable.hasOwnProperty(hash);
};
const removeKeyValuePair = (key) => {
  const hash = hashFunction(key);
  delete hashTable[hash];
};
const clearHashTable = () => {
  hashTable = {};
};
const adjustHashTableSize = (newSize) => {
  const oldHashTable = hashTable; // Store the current hash table
  hashTable = {}; // Create a new empty hash table with the new size
  // Transfer key-value pairs from the old hash table to the new one
  for (const [key, value] of Object.entries(oldHashTable)) {
    addKeyValuePair(key, value);
  }
};
