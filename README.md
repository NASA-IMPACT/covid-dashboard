# Earthdata Example Dashboard

The Earthdata Example Dashboard is a stripped-down version of the dashboard developed to support deriving insights on the impact of COVID-19 on different environmental factors. This stripped down version of the site supports exploring Earth Satellite imagery.

Source code: https://github.com/nasa-impact/earthdata-example
Visit the live site on: https://earthdata.nasa.gov/covid19/

This dashboard is powered by an [open source API](https://github.com/NASA-IMPACT/covid-api/) that is developed in parallel. This API focuses on serving the Cloud Optimized GeoTIFF and time-series indicator data that people can interact with in the dashboard.

## Current Features

* Earthdata (Raster) Visualization


## Future Features

To simplify configuration for this example dashboard, a number of key features of the original COVID-19 dashboard have been removed. Specifically:

* [Indicators](https://earthdata.nasa.gov/covid19/indicators)
* [Discoveries](https://earthdata.nasa.gov/covid19/discoveries)

It is the intent of this repository to add generators and guidance for adding those to a new deployment.

## New features

* Vector data visualization
* User-provided search parameters produces data visualization

## Installation and Usage
The steps below will walk you through setting up your own instance of the project.

### Install Project Dependencies
To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) v12 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/) Package manager

### Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:

```
nvm install
```

Install Node modules:

```
yarn install
```

### Usage

#### Config files
All the config files can be found in `app/assets/scripts/config`.
After installing the projects there will be 3 main files:
  - `local.js` - Used only for local development. On production this file should not exist or be empty.
  - `staging.js`
  - `production.js`

The `production.js` file serves as base and the other 2 will override it as needed:
  - `staging.js` will be loaded whenever the env variable `DS_ENV` is set to staging.
  - `local.js` will be loaded if it exists.

The following options must be set: (The used file will depend on the context):
  - `value` - Description

Example:
```
module.exports = {
  value: 'some-value'
};
```

#### Starting the app

```
yarn serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:9000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

# Deployment
To prepare the app for deployment run:

```
yarn build
```
or
```
yarn stage
```

This will package the app and place all the contents in the `dist` directory.
The app can then be run by any web server.

**When building the site for deployment provide the base url trough the `BASEURL` environment variable. Omit the leading slash. (E.g. https://example.com)**

Run on AWS:

```bash
export API_URL=CHANGEME
yarn deploy
```

# License
This project is licensed under **Apache 2**, see the [LICENSE](LICENSE) file for more details.
