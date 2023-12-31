const youtube = require("youtube-music-api")
const yt = new youtube()

let run = async () => {
    console.log("Test")
    const playlist = "PLWzl3AM4OHkxyqK9-BEKefHMSRzwEs3Bf"
    await yt.initalize()
    const list = await yt.getPlaylist(playlist)
    const musics = list.content
    const music = musics[Math.floor(Math.random() * musics.length)]
    const url = `https://www.youtube.com/watch?v=${music.videoId}`
    console.log(url)
}
run()