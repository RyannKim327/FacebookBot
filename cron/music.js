const axios = require("axios")
const fs = require("fs")
const http = require("https")
const afk2 = require("./../utils/afk")
const g = require("./../utils/gender")


module.exports = async (api, event) => {
	let name = `${__dirname}/../temp/${event}_worship.mp3`
	let json = JSON.parse(fs.readFileSync("data/songs.json", "utf8"))
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let songs = json.links
	let song = songs[Math.floor(Math.random()) * songs.length]
	if(!fs.existsSync(name)){
		dl(song).then(response => {
			let file = fs.createWriteStream(`temp/${event}_worship.mp3`)
			http.get(response[0], (r) => {
				r.pipe(file)
				file.on("finish", () => {
					api.sendMessage({
						body: `A blessed sunday everyone, a song entitled ${response[1]} was sent to this thread.`,
						attachment: fs.createReadStream(name).on("end", () => {
							if(fs.existsSync(name)){
								fs.unlink(name, (e) => {})
							}
						})
					}, event, (e, m) => {})
				})
			})
		})
	}
}