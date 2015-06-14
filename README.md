# gh-pages-bootstrap

[![NPM](https://nodei.co/npm/gh-pages-bootstrap.png)](https://npmjs.org/package/gh-pages-bootstrap)

## About

### The problem

Your website is currently hosted on GitHub Pages, but you're moving away. Maybe you want to deploy TLS (good on you!), or maybe GitHub's URL construction is too inflexible for you.

However, when you move your site to a different server, suddenly all your links break. You find yourself manually `git clone`ing all of your repositories just to get a usable website!

### The solution

`gh-pages-bootstrap` is a small utility to automate this for you. It queries the GitHub API and then reconstructs exactly what you'd see on GitHub Pages on your local disk. Presto!

## Installation

    npm install gh-pages-bootstrap

Or as a CLI tool:

    npm install -g gh-pages-bootstrap

## Usage

As a module:

    ```js
    var bootstrap = require('gh-pages-bootstrap');
    
    var user = 'someone'; // GitHub user
    var token = 'a1b2c3d4e5f6g7h8i9j0'; // GitHub OAuth2 token
    
    ghpages(user, token, function(err) {
    	throw err;
    });
	```

On the commandline:

    $ gh-pages-bootstrap

This will prompt you for your GitHub username and password. If you run it a second time, it will use the cached OAuth2 token.

## Author

Alex Jordan (@strugee on GitHub)

## License

LGPL3+
