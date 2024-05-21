const { Innertube, UniversalCache } = require("youtubei.js")
const { Readable } = require("stream")
const fs = require("fs")

function addFormDataInfo(strm, filename, size, mimeType){
  strm.httpVersion = ""
  strm.client = {
    _httpMessage: {
      path: filename
    }
  }
  strm.headers = {
    'Content-Length': size,
    'Content-Type': mimeType
  }
  return strm
}

module.exports = async (api, event, regex) => {
  const start = (Date.now() / 1000)
  const user = await api.getUserInfo(event.senderID)
  // const filename = `${event.threadID}_${event.senderID}.mp3`
  // if(fs.existsSync(filename)){
    // return api.sendMessage("Your requires is still in progress, please wait for a moment.", event.threadID, (e, m) => {}, event.messageID)
  // }
  api.sendMessage("Searching...", event.threadID, async (err, msg) => {
    const messageID = msg.messageID
    try{
      // const json = JSON.parse(fs.readFileSync("data/preferences.json", "utf-8"))
      // const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}.mp3`)
      const data = event.body.match(regex)[1]
      const yt1 = /youtube.com\/watch\?v=([a-zA-Z0-9\-_]{11}$)/i
      const yt2 = /youtu.be\/([a-zA-Z0-9\-_]{11})/i
      let videoID = ""
      let title = ""
      const yt = await Innertube.create({
        cache: new UniversalCache(false),
        generate_session_locally: true
      })
      if(yt1.test(data)){
        videoID = data.match(yt1)
      }else if(yt2.test(data)){
        videoID = data.match(yt2).split("?")[0]
      }else{
        const search = await yt.search(data)
        const bannedResult = ["ShowingResultsFor", "Channel", "Shelf", "ReelShelf"]
        let index = 0
        while(bannedResult.includes(search.results[index].type)){
          index++
        }
        const video = search.results[index]
        videoID = video.id
        title = video?.title?.text ?? "Wala munang title"
      }
      const info = await yt.getBasicInfo(videoID)
      const formatOptions = {
        type: 'audio',
        quality: 'best',
        format: 'mp3'
      }

      const format = info.chooseFormat(formatOptions)
      const stream = await info.download({...formatOptions})
      const mime = format.mime_type.split(";")[0]
      const filename = `${user[event.senderID]['firstName']}_${title.replace("/", "")}.mp3`
      // const size = Math.round((format.content_length / (1024 * 1024) + Number.EPSILON) * 100) / 100
      api.editMessage("Processing...", messageID, (e, m) => {})
      const strm = addFormDataInfo(Readable.fromWeb(stream), filename, format.content_length, mime)
      api.sendMessage({
        body: ".",
        attachment: strm
      }, event.threadID, (e, m) => {
        api.editMessage(`A song entitied: ${info.title}\nProcess Time: ${((Date.now() / 1000) - start).toFixed(2)}`, messageID, (e, m) => {})
      }, messageID)
    }catch(error){
      api.editMessage(`[ERR]: ${error}`, messageID, (e, m) => {})
      // if(fs.existsSync(filename)){
        // fs.unlinkSync(filename, (e) => {})
      // }
    }
  })
}
