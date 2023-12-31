const playlists = [
    "PLI3KQeEwuu89pAYq9wl4izyZ-9b1Njsog"
    // "PLWzl3AM4OHkxyqK9-BEKefHMSRzwEs3Bf",
    // "PLpL27IibkE6v1WHG-WrbskY-fFHdTK0sH",
    // "PLUfc10pMf7KRU0sFsv8d8m8APdkE9cuE2"
]
const playlist = playlists[Math.floor(Math.random() * playlists.length)]
console.log(playlist)

const youtube = require("youtube-music-api")
const yt = new youtube()
async function run(){
    await yt.initalize()
    const music = await yt.getPlaylist(playlist)
    console.log(music)
    // let _music = music.content[Math.floor(Math.random() * music.content.length)]
	// while(_music.videoId == undefined){
	// 	_music = music.content[Math.floor(Math.random() * music.content.length)]
	// }
	// while(_music.videoId == null){
	// 	_music = music.content[Math.floor(Math.random() * music.content.length)]
	// }
	// const url = `https://www.youtube.com/watch?v=${_music.videoId}`
    // console.log(url)
}
run()