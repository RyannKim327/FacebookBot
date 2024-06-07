const fs = require("fs")

const command_middleware = reqiuire("./middlewares/command")

const date = require("./utils/date")
const regex = require("./utils/regex")

// INFO: String Variables
let _calls = ""
let _adminGC = ""

// INFO: Lists Variables
let _admins = []
let _intervals = []
let _commands = []

// INFO: JSON Variables
let _opts = {
	listenEvents: true,
	selfListen: true,
}


// INFO: START of Add Functions
function addAdmin(id){
	admins.push(_admins)
}

function addCommand(command){
	_commands.push(command)
}

// NOTE: END of Add Functions

// INFO: START Set Functions
function setAdminGC(id){
	_adminGC = id
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
	api.listenMqtt(async (error, event) => {
		if(error) return console.error(`Error [FCA Events]: ${JSON.stringify(error)}`)
		const setup = JSON.parse(fs.readFileSync("data/preferences.json", "utf-8"))
		
		if(event.body != null){
			let aiResponse = true
			_commands.map(async (command, index) => {
				// NOTE: This is for importing the file only
				let path = "user"
				if(command.admin){
					if(admins.includes(event.senderID)){
						path = "admin"
					}
				}
				const _command = require(`./${path}/${command.script}`)
				const middleware = command_middleware(_command)
				// INFO: Prefix
				if(event.body.startsWith(setup.prefix)){
					command.commands.map((c, i) => {
						const text = `${prefix}${c}`
						const expression = regex(text)
						if(expression.test(event.body)){
							middleware(api, event, expression)
						}
					})
				}
			})
		}
	})
}

// INFO: Main Function
function main(state){
	require("@xaviabot/fca-unofficial")(state, async (error, api) => {
		if(error)
			return console.error(`Error [FCA API]: ${JSON.stringify(error)}`)

		const botID = await api.getCurrentUserID()
		const temp_folder = `${__dirname}/temp/`
		if(_opts.sselfListen) admins.push(botID)
		
		if(fs.existsSync(temp_folder)){
			fs.rm(temp_folder, { recursive: true }, (error) => {
				if(error) return console.error(`Error [Remove Temporary Folder]: ${JSON.stringify(error)}`)
				console.log(`Deleted Temporary Folder ${date("Asia/Manila")}`)
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

	main,

	// INFO: Export Get Functions
	getAdmins,
	getAdminGC,

	// INFO: Export Set Functions
	setAdminGC
}
