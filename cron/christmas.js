const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const g = require("./../utils/gender")
const youtubei = require("youtubei.js")

let search = async () => {
	let { data } = await axios.get("https://www.billboard.com/lists/best-christmas-songs")
	let $ = await cheerio.load(data)
	let html = $("#pmc-lists-front-js-extra")
	//console.log(JSON.parse(html.html().replace(/\t|\n|var pmcGalleryExports = |;/gi, "")))
	let json = JSON.parse(html.html().replace(/\t|\n|var pmcGalleryExports = |;/gi, ""))
	let gallery = json.gallery
	let r = Math.floor(Math.random() * gallery.length)
	let d = gallery[gallery.length - 12]
	while(d.video == undefined){
		r = Math.floor(Math.random() * gallery.length)
		d = gallery[r]
	}
	let desc = cheerio.load(d.description)
	let v = cheerio.load(d.video)
	let video = v("iframe").attr("data-src").split("/")[4].split("?")[0]
	let source = `https://www.billboard.com/lists/best-christmas-songs/${d.slug}/#!`
	let js = {
		title: d.title,
		description: desc.text(),
		videoID: video,
		sc: source
	}
	//console.log(`Happy Hollidays!!!\nTitle: ${d.title}\nDescription: ${desc.text()}\nVideo Url: ${video}\nSource: ${source}`)
	return js
}

module.exports = async (api, event) => {
	let data = await search()
	console.log(data)
	let yt = await new youtubei()
	let v = yt.getDetails(data.videoID)
	//let event = api.getCurrentUserID()
	let n = `${__dirname}/../temp/${event}_pasko.mp3`
	let f = fs.createWriteStream(`temp/${event}_pasko.mp3`)
	let dl = yt.download(data.videoID, {
		format: "mp4",
		quality: "tiny",
		type: "audio",
		audioQuality: "lowest",
		audioBitrate: "550"
	})
	dl.pipe(f)
	dl.on("end", async () => {
		let thread = await api.getThreadInfo(event)
		let m = "Happy Hollidays!!! "
		if(thread.isGroup){
			m += thread.threadName
		}else{
			let u = await api.getUserInfo(event)
			let gender = g(u[event]['firstName'])["eng"]
			m += `${gender} ${u[event]['name']}`
		}
		m += `\nHere's a song entitiled: ${data.title}\n~ ${data.description}\n\nSource: ${data.sc}`
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