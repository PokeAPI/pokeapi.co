# pokeapi.co <a href="https://pokeapi.co/api/v2/pokemon/xatu"><img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/178.svg' height=50px/></a>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![build status](https://img.shields.io/circleci/build/github/PokeAPI/pokeapi.co/master.svg)](https://circleci.com/gh/PokeAPI/pokeapi.co)

This repository contains the source code and documentation for [pokeapi.co](https://pokeapi.co/). This website is built on [React-Static](https://react-static.js.org), a static site generator similar to [Gatsby](https://www.gatsbyjs.org/), except unopinionated and with less magic.

## Getting Started

### Prerequisities

-   Git
-   [Node](https://nodejs.org/en/): 10.11.0 or greater
-   A GitHub fork of the repo (for any contributions)
-   A clone of the [pokeapi.co repo](https://github.com/pokeapi/pokeapi.co) on your local machine

### Installation

1. `cd pokeapi.co` to go into the project root.
2. `npm install` to install project dependencies.

### Running locally

1. `npm run start` to start the hot-reloading development server (powered by [React-Static](https://react-static.js.org)).
2. Go to `http://localhost:3000` to view the site in your browser.

### Building for production

1. `npm run build` to build the production site.
2. `npm run serve` to serve the production version of the site on a local test server.

Production files are located in the `dist` directory.

## Contributing

### Fork the project

1. [Fork the project to your own GitHub profile.](https://help.github.com/articles/fork-a-repo/)
2. [Clone the forked repository](https://help.github.com/articles/cloning-a-repository/) onto your local machine.
3. `git remote add upstream https://github.com/PokeAPI/pokeapi.co` to create a remote handle to the upstream repo.
4. `git pull upstream master` to ensure you have the latest main code.
5. `git checkout -b branch-name` (replacing branch-name with a suitable name) to create a branch for your changes.

### Make the change

1. Follow the "Running locally" instructions.
2. Save the files and check results in the browser.

Changes to React components in `/src` will hot-reload. If modifying the `/alerts.json` file or files in the `/src/docs/` directory, you will need to restart the dev server before changes will be visible.

### Test the change

If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.

### Push it

1. `git add -A` to stage your changed files.
2. `git commit -m "My message"` (replacing My message with a commit message, such as "Fix header logo on Android") to commit your changes. While not critically important, try to follow the guidelines in [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/#seven-rules).
3. `git push my-fork-name branch-name` to push your changes to your own GitHub repository.
4. Go to the pokeapi.co GitHub repo and you should see your recently pushed branches.
5. Follow GitHub's instructions to submit a pull request.
6. Describe the changes you made in the body of the PR. If possible, include screenshots of visual changes.
