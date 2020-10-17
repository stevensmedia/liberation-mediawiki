const nodemw = require('nodemw');
const Promise = require('bluebird');
const util = require('util');

async function main()
{
	var local = require('./local');
	var mw = new nodemw({
		protocol: local.protocol,
		server: local.server,
		path: local.path,
	});
	Promise.promisifyAll(mw);

	try {
		var ret = await mw.logInAsync(local.user, local.password);
	} catch(e) {
		console.log(`LogIn failed: ${e}`);
	}

	try {
		var userData = await mw.whoisAsync('Polk');
		if(userData.userid) {
			console.log("User already exists");
		} else {
			console.log("User not found");
		}
	} catch(e) {
		console.log(`whois failed: ${e}`);
	}

	try {
		var account = await mw.createAccountAsync('Polk', '12345');
		console.log(account);
	} catch(e) {
		console.log(`createAccount failed: ${e}`);
	}


}

main();
