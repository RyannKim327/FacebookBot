const { exec } = require("child_process")

module.exports = () => {
	setInterval(() => {
		const date = new Date()
		if(exec(`git commit -m "${date.getMonth()}-${date.getDay()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} Auto git system [Replit]"`)){
			exec("git push origin main")
		}
		if(exec("git fetch origin")){
			exec("git pull")
		}
	}, 100)
}