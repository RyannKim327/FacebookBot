const { exec } = require("child_process")

module.exports = () => {
	setInterval(() => {
		if(exec("git fetch origin")){
			exec("git pull")
		}
	}, 100)
}