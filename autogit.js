class SuffixTree {
  constructor(string) {
    this.root = {};
    this.string = string;
    this.insert(string);
  }

  insert(string) {
    let current = this.root;
    for (let i = 0; i < string.length; i++) {
      if (!current[string[i]]) {
        current[string[i]] = {};
      }
      current = current[string[i]];
    }
    current['end'] = true;
  }

  search(query) {
    let current = this.root;
    for (let i = 0; i < query.length; i++) {
      if (!current[query[i]]) {
        return false;
      }
      current = current[query[i]];
    }
    return !!current['end'];
  }

  getLongestCommonSubstring() {
    let maxLen = 0;
    let lcs = "";
    this._getLongestCommonSubstring(this.root, "", maxLen, lcs);
    return lcs;
  }

  _getLongestCommonSubstring(node, currentLCS, maxLen, lcs) {
    if (!node) {
      return;
    }
    if (node['end']) {
      if (currentLCS.length > maxLen) {
        maxLen = currentLCS.length;
        lcs = currentLCS;
      }
    }
    for (let key in node) {
      if (key !== 'end') {
        this._getLongestCommonSubstring(node[key], currentLCS + key, maxLen, lcs);
      }
    }
  }
}

const suffixTree = new SuffixTree('banana');
console.log(suffixTree.search('ana')); // true
console.log(suffixTree.search('app')); // false
console.log(suffixTree.getLongestCommonSubstring()); // 'ana'
