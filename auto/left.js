const fs = require("fs")
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const ffmpegs = require('fluent-ffmpeg')
ffmpegs.setFfmpegPath(ffmpeg.path)

module.exports = async (api, event) => {
	if(event.type == "event"){
		if(event.logMessageType == "log:unsubscribe"){
			const songs = [
				"Exi25VAo6wU",
				"6iuUC8Gai9k",
				"TGyLsf7PRpU",
				""
			]
		}
	}
}