// const fs = require("fs")
// const yt_1 = /youtube.com\/watch\?v=([a-zA-Z0-9-_]{11}$)/
// const yt_2 = /youtu.be\/([a-zA-Z0-9-_]{11}$)/

// const c = [
// 	{
// 		c: [
// 			"hello", "world"
// 		]
// 	},{
// 		c: [
// 			"hi", "world"
// 		]
// 	}
// ]

// const a = JSON.parse(fs.readFileSync("x.json", "utf-8"))

// for(let c in a){
// 	console.log(a[c])
// }

// let a = "hello world po".split(" ")
// a.shift()
// console.log(a.join(" "))

const fs = require("fs")
const data = fs.readFileSync("a.txt", "utf-8")
const keys = [
	"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
]
const replacer = {
	"G#": "Ab",
	"A#": "Bb",
	"C#": "Db",
	"D#": "Eb",
	"F#": "Gb"
}
const key = "C"

const song = data.split("\n")[1].split(/\s/)
console.log(song)

for(let s = 0; s < song.length; s++){
	let chord = ""
	let rep = song[s]
	if(replacer[song[s]]){
		rep = replacer[song[s]]
	}
	let _key = rep[0]
	if(rep[1] == "b" || rep[1] == "#"){
		_key += rep[1]
	}
	let k = 0
	while(k < keys.length){
		if(keys[k] == key){
			break
		}
		k++
	}
	let _k = 0
	console.log("Key: " + _key)
	while(_k < keys.length){
		if(keys[_k] == _key){
			break
		}
		_k++
	}
	console.log(keys[k + _k])
}
