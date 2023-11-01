const fca = require("fca-unofficial")
const cron = require("node-cron")
const axios = require("axios")
const fs = require("fs")

const jobs = require("./cron/start")
const cron_api = require("./config/api")
const openai = require("./auto/openai")
const { type } = require("os")
const { stat } = require("fs")

let commands = []
let options = {
	listenEvents: true,
	selfListen: false,
	forceLogin: true,
	autoReconnect: true,
	logLevel: "silent",
	updatePresence: true,
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

const start = (state) => {
	if(typeof(state) != "object"){
		try{
			state = JSON.parse(state)
		}catch(e){
			return console.error(`${e.message}`)
		}
	}
	fca(state, (error, api) => {
		if(error){
			return console.error(`Error [API]: ${error}`)
		}
		const self = api.getCurrentUserID()
		const pref = JSON.parse(fs.readFileSync("data/preferences.json", "utf-8"))
		
		if 
		api.setOptions(options)
		
	})
}

module.exports = {
	insert
}