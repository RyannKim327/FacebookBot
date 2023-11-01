const fca = require("fca-unofficial")
const cron = require("node-cron")
const axios = require("axios")
const fs = require("fs")

const jobs = require("./cron/start")
const cron_api = require("./config/api")
const openai = require("./auto/openai")

let admins = []
let commands = []
let options = {
	listenEvents: true,
	selfListen: false,
	forceLogin: true,
	autoReconnect: true,
	logLevel: "silent",
	updatePresence: true,
}

const addAdmin = (ID) => {
	admins.push(ID)
} 

const insert = (file) => {
	if(typeof(file) != "object"){
		file = JSON.parse(file)
	}
	for(let c = 0; c < file.length; c++){
		let command = file[c]
		commands.push(command)
	}
}

const doListen = (api) => {

}

const start = (state) => {
	if(typeof(state) != "object"){
		try{
			state = JSON.parse(state)
		}catch(e){
			return console.error(`${e.message}`)
		}
	}
	fca(state, async (error, api) => {
		if(error){
			return console.error(`Error [API]: ${error}`)
		}
		const self = api.getCurrentUserID()
		const pref = JSON.parse(fs.readFileSync("data/preferences.json", "utf-8"))
		
		if(options.selfListen){
			admins.push(self)
		}
		cron(api)
		cron_api(api)

		fs.rm("./temp", {recursive: true}, (e) => {
			console.log(`Remove temp folder: Done`)
			setTimeout(() => {
				if(!fs.existsSync("./temp")){
					console.log(`Retrieving temp folder: Done`)
					fs.mkdirSync("./temp")
				}
			}, 500)
		})

		api.setOptions(options)

		await doListen(api)

		setInterval(() => {
			axios.get("https://fbnode.mpoprevii.repl.co")
		}, ((1000 * 60) * 60))
	})
}

module.exports = {
	insert
}