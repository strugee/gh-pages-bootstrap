var search_branch = require('gh-search-branch');
var cloneOrPull = require('git-clone-or-pull');
var pkg = require('./package.json');

module.exports = function(user, auth_token, callback) {
	var search_options = {
		'ua': 'gh-pages-bootstrap/' + pkg.version,
		'token': auth_token
	};
	search_branch(user, 'gh-pages', search_options, function(err, repo) {
		if (err) callback(err);
		cloneOrPull('git://github.com/' + user + '/' + repo, {
			branch: 'gh-pages',
			path: '.'
		}, repo, function(err) {
			// Compat: 1.x only calls the callback on failures
			if (err) callback(err);
		});
		console.log('Spawned git process for ' + repo);
	});
};
