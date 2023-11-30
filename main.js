const config = require("./config")
const server = require("./server")
const repl = require("./replit_only.js")



config.addAdmins("100011558238843")
config.addAdmins("100081698814451")

config.setOptions({
	listenEvents: true,
	selfListen: true,
	forceLogin: true,
	autoReconnect: true,
	logLevel: "silent",
	updatePresence: true,
})

config.start({
	appState: JSON.parse(process.env['user'])
})


let run = () => {
	console.log("Run")
	setTimeout(run, (1000 * 60) * 60)
}
server()
// repl()
