// const YoutubeMusicApi = require("youtube-music-api");

// let a = async () => {
// 	let yt = new YoutubeMusicApi()
// 	await yt.initalize()
// 	let music = await yt.getPlaylist("PLR1NTS3hgCejXMPADNG4Z-g_kI8n0Yu57")
// 	let _music = music.content[Math.floor(Math.random() * music.content.length)]
// 	const song = `https://www.youtube.com/watch?v=${_music.videoId}`
// 	console.log(song)
// }
// a()

// const time = new Date()
// const m = `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
// console.log(m)

const fs = require("fs")
const { exec } = require("child_process")
const date = require("./utils/date")

let run = () => {
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

	// exec("git config --global user.name \"RyannKim327\"", (e) => {console.error(e)})
	// exec("git config --global user.email \"rksesgundo123@gmail.com\"", (e) => {console.error(e)})

	fs.writeFileSync("Auto git.txt", m3, "utf-8")
	setTimeout(() => {
		exec("git add .", (e) => {
			if(e) console.error(e)
		})
	})
	setTimeout(() => {
		exec(`git commit -m "${m}"`, (e) => {
			if(e)console.error(e)
		})
	}, 1000)

	setTimeout(() => {
		exec(`git push`, (e) => {
			if(e) console.error(e)
		})
	}, 2000)
}

setInterval(() => {
	run()
}, 15000)