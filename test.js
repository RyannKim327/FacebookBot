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

c.forEach(i => {
	i.c.forEach(j =>{
		if(j == "world"){
			return console.log("test")
		}
	})
})
