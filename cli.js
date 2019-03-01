var ghauth = require('ghauth');
var ghpages = require('./index.js');

var authOptions = {
	configName: 'gh-pages-bootstrap',
	scopes: ['public_repo'],
	note: 'gh-pages-bootstrap',
	userAgent: 'gh-pages-bootstrap/1.0.0'
};

ghauth(authOptions, function(err, authData) {
	if (err) throw err;
	ghpages(authData.user, authData.token, function(err) {
		throw err;
	});
});
