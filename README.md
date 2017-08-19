# Minesweeper with React + Redux

This is a minesweeper game built for fun. Uses React.js and redux.

* First run `npm install`.
* To run in dev mode, run `npm run start`.
* CSS is compiled from SCSS. To compile manually run `npm run build-css`, or run `npm run watch-css` to automatically compile CSS when the SCSS changes.
* To create a prod build, run `npm run build`. Note this won't run locally because the `homepage` field has been set
in package.json to make sure file paths are correct when deployed to gh-pages. To create your own functional local build you can remove this field first.

### DEMO

https://davidbanksnz.github.io/react-redux-minesweeper/

<img src="screenshot-win.png" width="400"> <img src="screenshot-lose.png" width="400">