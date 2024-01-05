function HashTable() {
  this.table = [];
}

HashTable.prototype.hashFunction = function(key) {
  return key.charCodeAt(0) % this.table.length;
};

HashTable.prototype.insert = function(key, value) {
  const hashValue = this.hashFunction(key);
  this.table[hashValue] = value;
};

HashTable.prototype.retrieve = function(key) {
  const hashValue = this.hashFunction(key);
  return this.table[hashValue];
};

HashTable.prototype.delete = function(key) {
  const hashValue = this.hashFunction(key);
  delete this.table[hashValue];
};

const hashTable = new HashTable();
hashTable.insert('apple', 'red');
hashTable.insert('banana', 'yellow');
hashTable.insert('cherry', 'red');

console.log(hashTable.retrieve('apple')); // red
console.log(hashTable.retrieve('banana')); // yellow
console.log(hashTable.retrieve('cherry')); // red

hashTable.delete('cherry');

console.log(hashTable.retrieve('cherry')); // null
