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

for(let i in c){
	const d = c[i]
	for(let j in d.c){
			if(j == "world"){
				return console.log("test")
			}
		}
}

