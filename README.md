# pokeapi.co

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This repository contains the source code and documentation for [pokeapi.co](pokeapi.co). This website is built on [Gatsby](https://www.gatsbyjs.org/) and includes a [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/) file for deployment on Netlify.

## Getting Started

### Prerequisities
- Git
- [Node](https://nodejs.org/en/): 8.4.0 or greater
- A fork of the repo (for any contributions)
- A clone of the [pokeapi.co repo](https://github.com/pokeapi/pokeapi.co) on your local machine

### Installation
1. `cd pokeapi.co` to go into the project root.
2. `npm install` to install project dependencies.

### Running locally
1. `npm run develop` to start the hot-reloading development server (powered by [Gatsby](https://www.gatsbyjs.org/)).
2. Go to `http://localhost:8000` to view the site in your browser.

## Contributing

### Fork the project
1. [Fork the project to your own GitHub profile.](https://help.github.com/articles/fork-a-repo/)
2. [Clone the forked repository](https://help.github.com/articles/cloning-a-repository/) onto your local machine.
3. `git pull origin master` to ensure you have the latest main code.
4. `git checkout -b branch-name` (replacing branch-name with a suitable name) to create a branch.


### Make the change
1. Follow the "Running locally" instructions.
2. Save the files and check results in the browser.

Changes to React components in `src` will hot-reload. If working with plugins, you may need to remove the `.cache` directory and restart the server.

### Test the change
If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.

### Push it
1. `git add -A` to stage your changed files.
2. `git commit -m "My message"` (replacing My message with a commit message, such as "Fix header logo on Android") to commit your changes.  
    While not critically important, try to follow the guidelines in [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/#seven-rules).


4. `git push my-fork-name branch-name` to push your changes to your own GitHub repository.
5. Go to the pokeapi.co repo and you should see your recently pushed branches.
6. Follow GitHub's instructions to submit a pull request.
7. Describe the changes you made in the body of the PR. If possible, include screenshots of visual changes.
