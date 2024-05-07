const mirai = require("mirai-fca-unofficial")
const fs = require("fs")

module.exports = async (username, password) => {
  mirai({
    email: username,
    password: password
  }, (err, api) => {
    if(err){
      console.error(`Error [Mirai]: ${err}`)
        return false
    }
    fs.writeFileSync("setup/asset.json", JSON.stringify(api.getAppState(), null, 4), "utf-8")
    console.log(`Success [Mirai]: Appstate recreated`)
    return true
  })
}
