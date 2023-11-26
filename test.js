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
	"Ab": "G#",
	"Bb": "A#",
	"Db": "C#",
	"Eb": "D#",
	"Gb": "F#",
}
const key = "C"

const song = data.split("\n")[1].split(/\s/)

for()
