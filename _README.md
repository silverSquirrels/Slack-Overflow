# Hack Overflow

> A technical forum for the Hack Reactor Remote Community to share their expertise

## Team

  - __Product Owner__: Michael Frazier  
  - __Scrum Master__: Eric Broberg
  - __Development Team Members__: Colton Savage, Andrew Vedady

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Once the app is deployed (or run locally), users should be able to sign in with their GitHub accounts.  They can ask a question in a specific forum, or comment on someone else's question.

## Requirements

- Node ^4.0.0 


## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
gulp
```

Note: You may need to individually install the following modules: moment and colors
```sh
npm install moment
bower install --save moment
npm install colors
```

### Gulp

From root directory:

```sh
gulp

Will concat and minify CSS and JS files, auto-transpile Sass to CSS, automatically inject <link> and <script> tags into client/index.html, and start a nodemon server.
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
