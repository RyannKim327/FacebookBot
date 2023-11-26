const YoutubeMusicApi = require("youtube-music-api");

let a = async () => {
	let b = new YoutubeMusicApi()
	await b.initalize()
	let c = await b.search("sana")
	console.log(c)
}
a()