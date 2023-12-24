const cron = require("node-cron")
const fs = require("fs")
const { exec } = require("child_process")
const time = require("./utils/date")

module.exports = () => {
	cron.schedule("0 */2 * * *", () => {
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
			exec("git add .", (e) => {console.error(e)})
		})
		setTimeout(() => {
			exec(`git commit -m "${m}"`, (e) => {console.error(e)})
		}, 1000)
		setTimeout(() => {
			exec(`git push origin main`, (e) => {console.error(e)})
		}, 2000)
	}, {
		scheduled: true,
		timezone: "Asia/Manila"
	})
}