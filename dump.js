const cron = require("node-cron")
const fs = require("fs")
const { exec } = require("child_process")

module.exports = () => {
	cron.schedule("0 0 * * *", () => {
		const time = new Date()
		const m = `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
		fs.writeFileSync("Auto git.txt", m, "utf-8")
		exec(`git commit -m "${m}"`)
		exec(`git push origin main`)
	})
}