const anonfile = require('anonfile-lib');
anonfile.get('FILE ID').then((info) => {
	console.log(info);
});

anonfile.upload('FILEPATH').then((info) => {
	console.log(info);
});
