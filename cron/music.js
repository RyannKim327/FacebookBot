const axios = require("axios")
const fs = require("fs")
const afk2 = require("./../utils/afk")
const g = require("./../utils/gender")

async function conv(v, t, e) {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-Key': 'de0cfuirtgf67a'
	}
	results = await axios.post("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", "v_id=" + v + "&ftype=mp3&fquality=128&token=" + t + "&timeExpire=" + e + "&client=yt5s.com", {
		headers: headers
	}).then((response) => {
		return response.data.d_url
	}).catch((error) => {
		return error.message
	})
	return results
}
async function fetch(query) {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	results = await axios.post("https://yt5s.com/api/ajaxSearch", "q=" + query + "&vt=mp3", {
		headers: headers
	}).then((response) => {
		return response.data
	}).catch((error) => {
		return error.message
	});
	return results
} 
async function dl(x){
	let s = fetch(x)
	let r = await s.then((response) => {
		let slist = response
		console.log(slist)
		if(slist.t < 1500){
			let d_u = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
				return [response, slist.title, slist.a]
			})
			return d_u
		}else{
			return "There's an error"
		}
	})
	return r
}


module.exports = async (api, event) => {
	let name = `${__dirname}/../temp/${event}_worship.mp3`
	let top = await top100()
	let json = JSON.parse(fs.readFileSync("data/songs.json", "utf8"))
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(!fs.existsSync(name)){
		let yt = await new youtubei()
		let songs = json.links
		let song = songs[Math.floor(Math.random() * songs.length)]
		let search = await yt.search(song)
		if(search.videos.length > 0){
			let s_id = search.videos[0].id
			if(s_id != undefined){
				const info = await yt.getDetails(s_id)
				if(info.title != undefined){
					let file = fs.createWriteStream(`temp/${event}_worship.mp3`)
					let dl = yt.download(s_id, {
						format: "mp4",
						quality: "tiny",
						type: "audio",
						audioQuality: "lowest",
						audioBitrate: "550"
					})
					dl.pipe(file)
					dl.on("end", async () => {
						let thread = await api.getThreadInfo(event)
						if(thread.isGroup){
							api.sendMessage({
								body: `A random worship song for ${thread.threadName} entitled ${info.title}`,
								attachment: fs.createReadStream(name).on("end", async () => {
									if(fs.existsSync(name)){
										fs.unlink(name, (e) => {
											if(e) return console.error(`Error [Unlink worship]: ${e}`)
										})
									}
								})
							}, event, (e, m) => {
								afk2(api, json2)
							})
						}else{
							let user = await api.getUserInfo(event)
							let gender = g(user[event]['firstName'])["eng"]
							api.sendMessage({
								body: `Here's a random worship song for you ${gender} ${user[event]['name']} entitled ${info.title}`,
								attachment: fs.createReadStream(name).on("end", async () => {
									if(fs.existsSync(name)){
										fs.unlink(name, (e) => {
											if(e) return console.error(`Error [Unlink worship]: ${e}`)
										})
									}
								}),
								mentions: [{
									id: event,
									tag: user[event]['name']
								}]
							}, event, (e, m) => {
								afk2(api, json2)
							})
						}
					})
				}
			}
		}
	}
}