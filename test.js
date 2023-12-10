const YoutubeMusicApi = require("youtube-music-api");

let a = async () => {
	let yt = new YoutubeMusicApi()
	await yt.initalize()
	let music = await yt.getPlaylist("PLR1NTS3hgCejXMPADNG4Z-g_kI8n0Yu57")
	let _music = music.content[Math.floor(Math.random() * music.content.length)]
	const song = `https://www.youtube.com/watch?v=${_music.videoId}`
	console.log(song)
}
a()
// try{
// 	console.log(JSON.parse("test"))
// }catch(e){
// 	console.error("test" + e)
// }

