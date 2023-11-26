const fs = require("fs")

let changeKey = (chords, default_key, change_key) => {
	const keys = [
		"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
		"Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm"
	]
	const replacer = {
		"Ab": "G#",
		"Bb": "A#",
		"Db": "C#",
		"Eb": "D#",
		"Gb": "F#"
	}
	let result = ""
	const chord = chords.split(/\n/)
	for(let i = 0; i < chord.length; i++){
		const chords = chord[i].split(/\s/)
		for(let j = 0; j < chords.length; j++){
			let c = chords[j]
			if(replacer[c]){
				c = replacer[c]
			}
			if(keys.includes(c)){
				result += c + " "
			}
		}
	}
	return result
}

const data = fs.readFileSync("a.txt", "utf-8")
const a = changeKey(data, "C", "D")
console.log(a)