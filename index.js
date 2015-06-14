var https = require('https');
var spawn = require('child_process').spawn;

module.exports = function(user, auth_token, callback) {
	https.get({hostname: 'api.github.com', path: '/users/' + user + '/repos', headers: {'User-Agent': 'gh-pages-bootstrap/1.0.0', 'Authorization': 'token ' + auth_token}}, function(res) {
		var repos;
		var reposRaw = '';
		
		res.on('data', function(chunk) {
			reposRaw += chunk.toString();
		});

		res.on('end', function() {
			repos = JSON.parse(reposRaw);
			
			repos.forEach(function(repo) {
				https.get({
					hostname: 'api.github.com',
					path: '/repos/' + user + '/' + repo.name + '/branches',
					headers: {'User-Agent': 'gh-pages-bootstrap/1.0.0', Authorization: 'token ' + auth_token}
				}, function(res) {
					var branches;
					var branchesRaw = '';
					
					res.on('data', function(chunk) {
						branchesRaw += chunk.toString();
					});
					
					res.on('end', function() {
						branches = JSON.parse(branchesRaw);
						for (var j in branches) {
							var branch = branches[j];
							if (branch.name === 'gh-pages') {
								spawn('git', ['clone', '--branch', 'gh-pages', 'git://github.com/' + user + '/' + repo.name]).on('error', function(err) {
									callback(err);
								});
								console.log('Spawned git process for ' + repo.name);
							}
						}
					});
				}).on('error', function(err) {
					callback(err);
				});
			});
		});
	}).on('error', function(err) {
		callback(err);
	});
};
