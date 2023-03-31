module.exports = (str) => {
	let s = str.replace("/", "\\/")
	return new RegExp("^" + s, "i")
}