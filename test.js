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
const axios = require("axios")

let commits = 150

let run = async () => {
	const time = date("Asia/Manila")
	const m = `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
	// const m2 = [
	// 	"Sana ako pa rin",
	// 	"Bakit na mimiss ko pa rin sya",
	// 	"Ano kaya ang susunod na ilalagay ko dito",
	// 	"From valentines, hanggang pasko, na sana pati bagong taon",
	// 	"Ang cute nya, lalo na pag inis sya saken",
	// 	"Wala, talaga lang attractive sya saken",
	// 	"Nugagawen kapag miss ko na sya?",
	// 	"Parang malabo na pala, di na ko aasa",
	// 	"Mahirap lang isipin, pero tanggap ko.",
	// 	"Kahit anong gawin prii, sya pa rin."
	// ]
	const m2 = [
		"a random javascript code that has input",
		"a random javascript code that uses fetch",
		"a random javascript code that uses axios",
		"a random javascript code that uses cron",
		"a random javascript code of a random sort algorithm",
		"a random javascript code that uses api",
		"a random javascript code that connects thru async task in android"
	]	
	const m3 = m2[Math.floor(Math.random() * m2.length)]
	let { data } = await axios.get(`https://hercai.onrender.com/v3-beta/hercai?question=${m3}`)

	let datas = data.reply.split("\n")
	let result = ""
	let active = false

	for(let i = 0; i < datas.length; i++){
		if(datas[i].toLowerCase().startsWith("``` javascript")){
			active = !active
		}else if(datas[i].startsWith("```")){
			active = !active
		}
		if(active && !datas[i].startsWith("```")){
			result += datas[i] + "\n"
		}
	}


	// exec("git config --global user.name \"RyannKim327\"", (e) => {console.error(e)})
	// exec("git config --global user.email \"rksesgundo123@gmail.com\"", (e) => {console.error(e)})

	fs.writeFileSync("autogit.js", result, "utf-8")
	setTimeout(() => {
		console.log("Git add")
		exec("git add .", (e) => {
			if(e) console.error(e)
			setTimeout(() => {
				console.log("Git Commit")
				exec(`git commit -m "${m} [User mode]"`, (e) => {
					if(e) console.error(e)
					setTimeout(() => {
						console.log("Git push")
						exec(`git push`, (e) => {
							if(e) console.error(e)
							console.log("Close")
							exec("clear", (e) => {})
							setTimeout(() => {
								commits--
								if(commits > 0 ){
									run()
								}
							}, 2000)
						})
					}, 2000)
				})
			}, 1000)
		})
	})
}

run()