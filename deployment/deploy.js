const ghpages = require('gh-pages');

ghpages.publish('./', {
	src: ['build/index.html', 'build/static/**/*']
});