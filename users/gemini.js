const axios = require("axios")

const nth = (n) => {
  a = n % 10
  b = n % 100
  c = ""

  if(b >= 10 && b < 20){
    c = "th"
  }else{
    switch(a){
      case 1:
        c = "st"
      break
      case 2:
        c = "nd"
      break
      case 3:
        c = "rd"
      break
      default:
        c = "th"
    }
  }
  return `${n}${c}`
}

module.exports = async (api, event) => {
  if(event.messageReply.attachments.length > 0){
    try{
      let message = ""
      let i = 0
      for(let imgs of event.messageReply.attachments){
        const img = imgs.url
        console.log(img)
        const { data } = await axios.get(`https://haze-gemini-v-8ba147453283.herokuapp.com/gemini-vision?text=&image_url=${encodeURIComponent(img)}`).catch(e => console.error(`Error [Gemini]: ${JSON.stringify(e)}`))
        if(event.messageReply.attachments.length == 1){
          message += `The image shows:\n${data.response}`
        }else{
          message += `The ${nth(i + 1)} image shows:\n${data.response}.\n`
          i++
        }
      }
      api.sendMessage(message, event.threadID, (e, m) => {})
    }catch(e){
      api.sendMessage("Your request can't be process", event.threadID, (e, m) => {})
    }
  }
}
