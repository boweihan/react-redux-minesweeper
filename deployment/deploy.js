const ghpages = require('gh-pages');

ghpages.publish('./build', {
	src: ['index.html', 'static/**/*'],
});