module.exports = async (api, event, regex) => {
	const data = event.body.match(regex)[1]
	const rock = "👊"
	const paper = "🖐"
	const scisor = "✌"
	const ai = [rock, paper, scisor]
	
	switch(data){
		case rock:
			switch(ai)
		break
	}
	
}