var https = require('https');
var spawn = require('child_process').spawn;
var search_branch = require('gh-search-branch');

module.exports = function(user, auth_token, callback) {
	var search_options = {
		'ua': 'gh-pages-bootstrap/1.1.0',
		'token': auth_token
	};
	search_branch(user, 'gh-pages', search_options, function(err, repo) {
		if (err) callback(err);
		spawn('git', ['clone', '--branch', 'gh-pages', 'git://github.com/' + user + '/' + repo]).on('error', function(err) {
			callback(err);
		});
		console.log('Spawned git process for ' + repo);
	});
};
