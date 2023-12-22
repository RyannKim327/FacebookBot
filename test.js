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

const cron = require("node-cron")
const fs = require("fs")
const { exec } = require("child_process")

const time = new Date()
const m = `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
fs.writeFileSync("Auto git.txt", m, "utf-8")
// exec("git add .", (e) => {console.error(e)})
exec(`git commit -m "${m}"`, (e) => {console.error(e)})
exec(`git push origin main`, (e) => {console.error(e)})
