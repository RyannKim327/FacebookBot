const express = require("express")
const fs = require("fs")
const parser = require("body-parser")

const { setPrefix } = require("./config")

const app = express()
const enc = parser.urlencoded({extended: false})

module.exports = () => {
	const PORT = 5000 | 3000 | process.env.PORT | 7000
	app.use(express.static("public"))
	app.get("/", (req, res) => {
		res.sendFile(__dirname + "/index.html")
	})
	app.post("/feed", enc, (req, res) => {
		let json = JSON.parse(fs.readFileSync("data/feedback.json", "utf8"))
		json.data.push({
			msg: req.body.error,
			toRead: true
		})
		console.log(req.body.error)
		fs.writeFileSync("data/feedback.json", JSON.stringify(json), "utf8")
		res.end("Feedback sent")
	})
	app.post("/updates", enc, (req, res) => {
		let data = req.body.package
		if(data == undefined){
			res.end("Something went wrong.")
		}else{
			let js_ = JSON.parse(fs.readFileSync("data/updates.json", "utf8"))
			let json = js_[data]
			if(json != undefined){
				let f = {
					"version": json.ver,
					"link": json.url,
					"description": json.desc,
					"isRequired": json.req
				}
				res.end(JSON.stringify(f))
			}else{
				res.end("Not found")
			}
		}
	})
	app.get("/config", (req, res) => {
		if(req.query.code == undefined){
			res.send(JSON.stringify({"message": "Error"}))
		}else{
			if(req.query.code == process.env.code){
				let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
				let status = json.status
				let busy = json.busy
				let ai = json.ai
				let prefix = json.prefix
				let _json = {
					status,
					busy,
					ai,
					prefix
				}
				res.send(JSON.stringify(_json))
			}else{
				res.send(JSON.stringify({message: "Error"}))
			}
		}
	})
	app.post("/mod", enc, (req, res) => {
		let code = req.body.code
		if(code == undefined){
			return res.send(JSON.stringify({message: "Error"}))
		}
		if(code != process.env.code){
			return res.send(JSON.stringify({message: "Error"}))
		}
		let key = req.body.key
		let data = req.body.data
		if(key == "status" || key == "busy" || key == "ai"){
			if(data == "true"){
				data = true
			}else if(data == "false"){
				data = false
			}
		}
		switch(key){
			case "prefix":
				setPrefix(data)
			break
		}
		let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		json[key] = data
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		res.send(`Data for ${key} is now updated.`)
	})
	app.listen(PORT, () => {
		console.log("Listening to default port " + PORT)
	})
}