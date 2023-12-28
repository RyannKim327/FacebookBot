const cron = require("node-cron")
const fs = require("fs")
const { exec } = require("child_process")
const time = require("./utils/date")

module.exports = () => {
	console.log("Executed command")
	cron.schedule("0 * * * *", () => {
		const time = time("Asia/Manila")
		const m = `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
		const m2 = [
			"Sana ako pa rin",
			"Bakit na mimiss ko pa rin sya",
			"Ano kaya ang susunod na ilalagay ko dito",
			"From valentines, hanggang pasko, na sana pati bagong taon",
			"Ang cute nya, lalo na pag inis sya saken",
			"Wala, talaga lang attractive sya saken",
			"Nugagawen kapag miss ko na sya?"
		]

		const m3 = m2[Math.floor(Math.random() * m2.length)]
		fs.writeFileSync("Auto git.txt", m3, "utf-8")
		
		setTimeout(() => {
			console.log("Git add")
			exec("git add .", (e) => {
				if(e) console.error(e)
				setTimeout(() => {
					console.log("Git Commit")
					exec(`git commit -m "${m} [Replit]"`, (e) => {
						if(e) console.error(e)
						setTimeout(() => {
							console.log("Git push")
							exec(`git push`, (e) => {
								if(e) console.error(e)
							})
						}, 2000)
					})
				}, 1000)
			})
		})
		
	}, {
		scheduled: true,
		timezone: "Asia/Manila"
	})
}