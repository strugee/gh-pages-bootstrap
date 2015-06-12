var https = require('https');
var spawn = require('child_process').spawn;

module.exports = function(user, callback) {
	https.get({hostname: 'api.github.com', path: '/users/strugee/repos', headers: {'User-Agent': 'gh-pages-bootstrap/1.0.0'}}, function(res) {
		var repos;
		var reposRaw = '';
		
		res.on('data', function(chunk) {
			reposRaw += chunk.toString();
		});

		res.on('end', function() {
			console.dir(reposRaw);
			console.log('end');
			repos = JSON.parse(reposRaw);
			
			for (var i in repos) {
				https.get('https://api.github.com/repos/strugee/' + i.name + '/branches', function(res) {
					var branches;
					var branchesRaw = '';
					
					res.on('data', function(chunk) {
						branchesRaw += chunk.toString();
					});
					
					res.on('end', function() {
						var branches = JSON.parse(res);
						for (var j in branches) {
							if (j.name === 'gh-pages') {
								spawn('git', ['clone', '--branch', 'gh-pages', 'git://github.com/strugee/' + i.name]).on('error', function(err) {
									callback(err);
								});
								console.log('Spawned git process for ', i.name);
							}
						}
					});
				}).on('error', function(err) {
					callback(err);
				});
			}
		});
	}).on('error', function(err) {
		callback(err);
	});
};
