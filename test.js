const fs = require("fs")

let changeKey = (default_key, change_key) => {
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
}