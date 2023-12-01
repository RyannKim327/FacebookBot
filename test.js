/const YoutubeMusicApi = require("youtube-music-api");

let a = async () => {
	let b = new YoutubeMusicApi()
	await b.initalize()
	let c = await b.getPlaylist("PLR1NTS3hgCejXMPADNG4Z-g_kI8n0Yu57")
	let _music = c.content[Math.floor(Math.random() * c.content.length)]
	console.log(_music)
}
a()
// try{
// 	console.log(JSON.parse("test"))
// }catch(e){
// 	console.error("test" + e)
// }
