const fs = require("fs")
const yt_1 = /youtube.com\/watch\?v=([a-zA-Z0-9-_]{11}$)/
const yt_2 = /youtu.be\/([a-zA-Z0-9-_]{11}$)/

const c = [
	{
		c: [
			"hello", "world"
		]
	},{
		c: [
			"hi", "world"
		]
	}
]

const a = JSON.parse(fs.readFileSync("x.json", "utf-8"))

for(let c in a){
	console.log(a[c])
}