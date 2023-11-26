const YoutubeMusicApi = require("youtube-music-api");

let a = async () => {
	let b = new YoutubeMusicApi()
	await b.initalize()
	let c = await b.getPlaylist("PLyijK8r_zE5J1a5mrLxgxraLFRnNN5HDL")
	console.log(c)
}
a()