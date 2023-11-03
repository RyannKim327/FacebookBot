const worship = require("./../cron/music")

module.exports = async (api, event) => {
	
	worship(api, event.theadID)
}