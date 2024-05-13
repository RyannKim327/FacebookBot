const fs = require("fs")
const ytdl = require("ytdl-core")
const { getAdmins } = require("./../config")

module.exports = async (api, event) => {
  const file = fs.createReadStream(`temp/${event.senderID}_${event.threadID}_rick.mp3`)
  const url = ""
  ytdl(url, {
    quality: "lowestaudio"
  }).pipe(file).on("finish", () => {
    api.sendMessage({
      body: `A special song for you ${}`,
      attachment: fs.createReadStream(`${__dirname}/../temp/${event.senderID}_${event.threadID}_rick.mp3`).on("finish", () => {
        if(fs.existsSync(`${__dirname}/../temp/${event.senderID}_${event.threadID}_rick.mp3`)){
          fs.unlink(`${__dirname}/../temp/${event.senderID}_${event.threadID}_rick.mp3`, (e) => {})
        }
      })
    }, event.threadID, (e, m) => {})
  })
}
