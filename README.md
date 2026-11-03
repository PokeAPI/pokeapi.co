# pokeapi.co

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![build status](https://img.shields.io/circleci/build/github/PokeAPI/pokeapi.co/master.svg)](https://circleci.com/gh/PokeAPI/pokeapi.co)

This repository contains the source code and documentation for [pokeapi.co](https://pokeapi.co/). This website is built with [starlight](https://starlight.astro.build/).

## Getting Started

### Prerequisities

-   Git
-   [Node](https://nodejs.org/en/): (v16 or higher)
-   A GitHub fork of the repo (for any contributions)
-   A clone of the [pokeapi.co repo](https://github.com/pokeapi/pokeapi.co) on your local machine

### Installation

1. `cd pokeapi.co` to go into the project root.
2. `npm install` to install project dependencies.

### Running locally

1. `npm run dev` to start the [Astro’s development server](https://docs.astro.build/en/reference/cli-reference/#astro-dev).
2. This will log a message to your terminal with the URL of your local preview. Open this URL to start browsing your site.

### Building for production

1. `npm run build` to build the production site.
2. `npm run preview` to serve the production version of the site on a local test server.

Production files are located in the `dist` directory.

## Site announcements

Edit `src/data/alerts.json` to show announcements below the navbar on every page:

```json
[
  {
    "level": "warning",
    "active": true,
    "message": "A major API update is coming. Review the documentation before upgrading."
  }
]
```

Supported levels are `info`, `success`, `warning`, and `error`. Each level has a distinct color and label.
Only entries with `active: true` appear, in file order. Messages support inline Markdown, including
`**bold**`, `*italics*`, backtick code spans, and `[links](https://example.com)`.
For example: `"message": "A **major update** is coming. Read the [documentation](https://pokeapi.co/docs/v2/)."`
Set `active: false` to hide an announcement, or use an empty array to hide all announcements.
Visitors can dismiss each announcement for the current browser tab session. Changing its level or message makes it visible again.
Invalid levels, missing fields, and empty messages fail the build.

Run `yarn build` and deploy the site to publish announcement changes.

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

Changes to components, documentation, and `src/data/alerts.json` hot-reload during `yarn dev`. When using `yarn preview`, run `yarn build` again to see changes.

### Test the change

If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.

### Push it

1. `git add -A` to stage your changed files.
2. `git commit -m "My message"` (replacing My message with a commit message, such as "Fix header logo on Android") to commit your changes. While not critically important, try to follow the guidelines in [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/#seven-rules).
3. `git push my-fork-name branch-name` to push your changes to your own GitHub repository.
4. Go to the pokeapi.co GitHub repo and you should see your recently pushed branches.
5. Follow GitHub's instructions to submit a pull request.
6. Describe the changes you made in the body of the PR. If possible, include screenshots of visual changes.
