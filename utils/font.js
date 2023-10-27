module.exports = (word) => {
	const frank = "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz"
	let res = ""
	for(let i = 0; i < word.length; i++){
		let x = true
		for(let j = 0; j < alpha.length; j++){
			if(alpha[j] == word[i]){
				res += frank[j]
				x = false
				break
			}
		}
		if(x){
			res += word[i]
		}
	}
	return res
}