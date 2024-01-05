// Preprocessing Phase
function preprocess(pattern) {
    const alphabetSize = 256;
    const badCharacterTable = new Array(alphabetSize).fill(-1);
    const goodSuffixTable = [];

    for (let i = 0; i < pattern.length; i++) {
        badCharacterTable[pattern.charCodeAt(i)] = i;
    }

    let suffixLength = pattern.length;

    for (let i = pattern.length - 1; i >= 0; i--) {
        while (suffixLength > 0 && pattern.charAt(suffixLength - 1) != pattern.charAt(i)) {
            goodSuffixTable[suffixLength - 1] = suffixLength;
            suffixLength = goodSuffixTable[suffixLength] || 0;
        }

        suffixLength--;
        goodSuffixTable[i] = suffixLength;
    }

    return { badCharacterTable, goodSuffixTable };
}

// Searching Phase
function boyerMoore(text, pattern) {
    const preprocessedData = preprocess(pattern);
    const badCharacterTable = preprocessedData.badCharacterTable;
    const goodSuffixTable = preprocessedData.goodSuffixTable;
    let patternIndex = pattern.length - 1;

    while (patternIndex < text.length) {
        let textIndex = patternIndex;

        for (let i = pattern.length - 1; i >= 0; i--) {
            if (pattern.charAt(i) != text.charAt(textIndex)) {
                patternIndex += Math.max(1, patternIndex - badCharacterTable[text.charCodeAt(textIndex)]);
                break;
            }

            textIndex--;

            if (i == 0) {
                return patternIndex;
            }
        }

        patternIndex += goodSuffixTable[patternIndex] || 1;
    }

    return -1;
}
const text = 'This is a sample text for string searching.';
const pattern = 'string';

const result = boyerMoore(text, pattern);
console.log(result); // Output: 19
