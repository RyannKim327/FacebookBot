module.exports = async (api, event, regex) => {
	const data = event.body.match(regex)[1]
	const rock = "👊"
	const paper = "🖐"
	const scisor = "✌"
	const ai = [rock, paper, scisor]
	const choice = ai[Math.floor(Math.random() * ai.length)]
	switch(data){
		case rock:
			switch(choice){
				case
			}
		break
	}
	
}