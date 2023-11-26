const YoutubeMusicApi = require("youtube-music-api");

let a = async () => {
	let b = new YoutubeMusicApi()
	let c = b.getArtist("@Reyermusic")
	console.log(c)
}
a()