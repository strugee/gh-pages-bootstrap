# gh-pages-bootstrap

## The problem

Your website is currently hosted on GitHub Pages, but you're moving away. Maybe you want to deploy TLS (good on you!), or maybe GitHub's URL construction is too inflexible for you.

However, when you move your site to a different server, suddenly all your links break. You find yourself manually `git clone`ing all of your repositories just to get a usable website!

## The solution

`gh-pages-bootstrap` is a small utility to automate this for you. It queries the GitHub API and then reconstructs exactly what you'd see on GitHub Pages on your local disk. Presto!

## Author

Alex Jordan (@strugee on GitHub)

## License

LGPL3+
