
const fs = require("fs")
const g = require("./../utils/gender")
const youtubei = require("youtubei.js")

module.exports = async (api, event) => {
	let songs = [
		"Aop6YF1Xqqg",
		"WTCryF1J54Y",
		"aCMLV3j8J_w",
		"UDRo5ExFZ8U",
		"AVNsDQ_CFHc"
	]
	let song = songs[Math.floor(Math.random() * songs.length)]
	let yt = await new youtubei()
	let v = await yt.getDetails(song)
	//let event = api.getCurrentUserID()
	let n = `${__dirname}/../temp/${event}_newyear.mp3`
	let f = fs.createWriteStream(`temp/${event}_newyear.mp3`)
	let dl = yt.download(song, {
		format: "mp4",
		quality: "tiny",
		type: "audio",
		audioQuality: "lowest",
		audioBitrate: "550"
	})
	dl.pipe(f)
	dl.on("end", async () => {
		let thread = await api.getThreadInfo(event)
		let m = "Happy New year!!!\n\n~ Enjoy the last days of vacation."
		if(thread.isGroup){
			m += thread.threadName
		}else{
			let u = await api.getUserInfo(event)
			let gender = g(u[event]['firstName'])["eng"]
			m += `${gender} ${u[event]['name']}`
		}
		m += `\nHere's a song entitiled: ${v.title}`
		api.sendMessage({
			body: m,
			attachment: fs.createReadStream(n).on("end", async () => {
				if(fs.existsSync(n)){
					fs.unlink(n, (e) => {
						if(e) return console.error(`Error [Unlink worship]: ${e}`)
					})
				}
			})
		}, event)
	})
}