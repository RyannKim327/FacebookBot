const fs = require("fs")

const command_middleware = require("./middlewares/command")

const date = require("./utils/date")
const log = require("./utils/logs")
const regex = require("./utils/regex")

// INFO: String Variables
let _calls = ""
let _adminGC = ""

// INFO: Lists Variables
let _admins = []
let _intervals = []
let _commands = []
const categories = [
	"ai",
	"dump",
	"education",
	"game",
	"multimedia",
	"onetime",
	"theology"
]

// INFO: JSON Variables
let _opts = {
	listenEvents: true,
	selfListen: true,
}
const cooldown_rate = {
	"ai": 5,
	"dump": 0,
	"education": 2.5,
	"game": 0,
	"multimedia": 3,
	"onetime": 0,
	"theology": .5
}

let cooldowns = {
	"ai": "",
	"dump": "",
	"education": "",
	"game": "",
	"multimedia": "",
	"onetime": "",
	"theology": ""
}

// INFO: START of Add Functions
function addAdmin(id){
	_admins.push(id)
}

function addCommand(command){
	_commands.push(command)
}

// NOTE: END of Add Functions

// INFO: START Set Functions
function setAdminGC(id){
	_adminGC = id
}

function setOptions(opts){
	if(typeof(opts) !== "object") return
	_opts = opts
}

// NOTE: END of Set Functions

// INFO: START of Get Functions
function getAdmins(){
	return _admins
}

function getAdminGC(){
	return _adminGC
}

function getCommands(){
	return _commands
}

// NOTE: END of Get Functions

// INFO: CORE Function
function __core__(api){
	// TODO: This is the main loop process of the bot where it listen to a thread to gather some infomations.
	api.listenMqtt(async (error, event) => {
		if(error) return console.error(`Error [FCA Events]: ${JSON.stringify(error)}`)
		const setup = JSON.parse(fs.readFileSync("data/preferences.json", "utf-8"))
		
		if(event.body != null){
			let aiResponse = true
			event.body = event.body.replace(/\( | \[ | \] | \)/gi, "")
			_commands.map(async (command, index) => {
				
				// NOTE: This is for importing the file only
				let path = "user"
				if(command.admin){
					if(_admins.includes(event.senderID)){
						path = "admin"
					}
				}
				const _command = require(`./${path}/${command.script}`)
				const middleware = command_middleware(_command)
				
				// TODO: Prefix
				if(event.body.startsWith(setup.prefix)){
					const text = `${prefix}${command.command}`
					const expression = regex(text)
					if(expression.test(event.body) && command.message_type.includes(event.type)){
						middleware(api, event, expression)
					}
				}
			})
		}
	})
}

// INFO: Main Function
function main(state){
	// INFO: The main function trigger the server to start the process for the facebook bot.
	if(typeof(state) !== "object"){
		state = JSON.parse(state)
	}
	require("@xaviabot/fca-unofficial")(state, async (error, api) => {
		if(error)
			return console.error(`Error [FCA API]: ${JSON.stringify(error)}`)

		const botID = await api.getCurrentUserID()
		const temp_folder = `${__dirname}/temp/`
		if(_opts.selfListen) _admins.push(botID)
		
		if(fs.existsSync(temp_folder)){
			fs.rm(temp_folder, { recursive: true }, (error) => {
				if(error) return log(`Error [Remove Temporary Folder]: ${JSON.stringify(error)}`)
				log(`Deleted Temporary Folder ${date("Asia/Manila")}`)
				setTimeout(() => {
					if(!fs.existsSync(temp_folder)){
						fs.mkdirSync(temp_folder)
						console.log(`Recreated Temporary Folder`)
					}
				}, 500)
			})
		}else{
			fs.mkdirSync(temp_folder)
			console.log(`Temporary Folder Created`)
		}

		api.setOptions(_opts)
		__core__(api)
	})
}

module.exports = {

	// INFO: Export Add functions
	addAdmin,
	addCommand,

	cooldowns,
	cooldown_rate,
	main,

	// INFO: Export Get Functions
	getAdmins,
	getAdminGC,
	getCommands,

	// INFO: Export Set Functions
	setAdminGC,
	setOptions
}
