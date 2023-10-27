module.exports = (word) => {
	const frank = "𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊 ℌ ℑ 𝔍 𝔎 𝔏 𝔐 𝔑 𝔒 𝔓 𝔔 ℜ 𝔖 𝔗 𝔘 𝔙 𝔚 𝔛 𝔜 ℨ 𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷".split(" ")
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