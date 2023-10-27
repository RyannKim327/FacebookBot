const axios = require("axios")
const fs = require("fs")
const http = require("https")
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