const fca = require("fca-unofficial")
const cron = require("node-cron")
const axios = require("axios")

const jobs = require("./cron/start")
const cron_api = require("./config/api")
const openai = require("./auto/openai")

let commands = []

const insert = (file) => {
	if(typeof(file) != "object"){
		file = JSON.parse(file)
	}
	for(let)
}