const YoutubeMusicApi = require("youtube-music-api");

let a = async () => {
	let b = new YoutubeMusicApi()
	let c = b.getPlaylist("PLyijK8r_zE5J1a5mrLxgxraLFRnNN5HDL")
	console.log(c.data)
}
a()