const fs = require("fs")

module.exports = (api, event, regex) => {
	const data = JSON.parse(fs.readFileSync("data/playlist.json", "utf-8"))
	const data1 = event.body.match(regex)[1]
	const gex = /youtube.com\/playlist\?list=([\w\-_]+)/gi //PLcquD_eFr87cKxkZ6EvsoX_DK9D-ww3fc/
	const gex1 = //
	// if(data1.)
	data[event] = event.body
}