const requestlib = require('request');
const fs = require('fs');
var anonbaseurl = 'https://api.anonfile.com/';

var request = requestlib.defaults({ headers: { 'User-Agent': 'AnonFile-LIB Api Wrapper 1.0.1 by Jacub' } });
/**
 * 
 * @param {String} id 
 * @description Gets the specified file from anonfile and provides info object.
 */
function anonget(id) {
	return new Promise((resolve) => {
		request.get(`${anonbaseurl}v2/file/${id}/info`, (err, res, body) => {
			resolve(JSON.parse(body));
		});
	});
}
/**
 * 
 * @param {String} filepath 
 * @description Uploads the specified file to anon file and returns info object.
 */
function anonupload(filepath) {
	return new Promise((resolve) => {
		var anonupreq = request.post(`${anonbaseurl}upload`, (err, res, body) => {
			resolve(JSON.parse(body));
		});
		var form = anonupreq.form();
		form.append('file', fs.createReadStream(filepath));
	});
}

module.exports = {
	get: anonget,
	upload: anonupload
};
