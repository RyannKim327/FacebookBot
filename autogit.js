class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = new Array(size);
  }
}
HashTable.prototype.hash = function(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % this.size;
}
HashTable.prototype.set = function(key, value) {
  const index = this.hash(key);
  if (!this.buckets[index]) {
    this.buckets[index] = [];
  }
  this.buckets[index].push({ key, value });
}

HashTable.prototype.get = function(key) {
  const index = this.hash(key);
  if (this.buckets[index]) {
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        return this.buckets[index][i].value;
      }
    }
  }
  return undefined;
}

HashTable.prototype.delete = function(key) {
  const index = this.hash(key);
  if (this.buckets[index]) {
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        this.buckets[index].splice(i, 1);
        return;
      }
    }
  }
}
// Create a new instance of HashTable
const hashTable = new HashTable(10);

// Insert key-value pairs
hashTable.set('apple', 10);
hashTable.set('banana', 20);
hashTable.set('cherry', 30);

// Retrieve values
console.log(hashTable.get('apple')); // Output: 10
console.log(hashTable.get('banana')); // Output: 20
console.log(hashTable.get('cherry')); // Output: 30

// Delete a key-value pair
hashTable.delete('banana');
console.log(hashTable.get('banana')); // Output: undefined
