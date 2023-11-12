const { exec } = require("child_process")

module.exports = () => {
	setInterval(() => {
		if(exec(`git commit -m "Auto git system"`)){
			exec("git push origin main")
				if(exec("git fetch origin")){
					exec("git pull")
				}
			}
		}
	}, 100)
}