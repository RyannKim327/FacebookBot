const fs = require("fs")

let changeKey = (chords, default_key, change_key) => {
	const keys = [
		"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
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
			const c = chords[j]
			if(c.length > 2){
				break
			}
			result += c
		}
	}
	return result
}

const data = fs.readFileSync("a.txt", "utf-8")
const a = changeKey(data, "C", "D")
console.log(data)