module.exports = async (api, event, regex) => {
	const data = event.body.match(regex)[1]
	const rock = "👊"
	const paper = "🖐"
	const scisor = "✌"
	const ai = [rock, paper, scisor]
	const choice = ai[Math.floor(Math.random() * ai.length)]
	let won = ""
	switch(data){
		case rock:
			switch(choice){
				case paper:
					won = "Bot"
				break
				case 
			}
		break
	}
	
}