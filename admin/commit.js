const fs = require("fs")
const { exec } = require("child_process")
const date = require("./../utils/date")

module.exports (api, event) => {
	const time = date("Asia/Manila")
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
    api.setMessageReaction("🔄", event.messageID, (e) => {}, true)
    // exec("git config --global user.name \"RyannKim327\"", (e) => {console.error(e)})
	// exec("git config --global user.email \"rksesgundo123@gmail.com\"", (e) => {console.error(e)})
	fs.writeFileSync("Auto git.txt", m3, "utf-8")

	setTimeout(() => {
        api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
		exec("git add .", (e) => {
			if(e) console.error(e)
			setTimeout(() => {
                api.setMessageReaction("📃", event.messageID, (e) => {}, true)
				exec(`git commit -m "${m}"`, (e) => {
					if(e) console.error(e)
					setTimeout(() => {
                        api.setMessageReaction("➡", event.messageID, (e) => {}, true)
						exec(`git push`, (e) => {
							if(e) console.error(e)
                            api.sendMessage(`Done committing thru thge server, the commit message was [${m}]`, event.threadID, (e, m) => {
                                api.setMessageReaction("", event.messageID, (e) => {}, true)
                            })
						})
					}, 2000)
				})
			}, 1000)
		})
	})
}
