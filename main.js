const config = require("./configure")

// INFO: Adding commands
config.addCommand({
	name: "Admin Command List",
	description: "Just a helpdesk for admins",
	script: admin,
	category: "onetime",
	command: "admin",
	admin: true
})

config.addCommand({
	name: "Help desk",
	description: "A command for introduction and showing all list commands available for all users",
	script: "help",
	category: "onetime",
	command: "help"
})
