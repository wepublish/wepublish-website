# duda-website

## Requirements
* [Node.js](https://nodejs.org)
* [Npm](https://www.npmjs.com)

## SETUP DEVELOPMENT ENVIRONMENT
* copy .example.env to .env and set the KARMA_DATABASE environment variable in the .env file
* `npm install`
* `npm run dev` to run the webpack development server

The site well be accessible under [http://localhost:8080](http://localhost:8080). Actions like the Payment process which need a running backend don't work in the dev mode

## SETUP LOCAL PROD ENVIRONMENT
The following steps will run an example production server which enables features like caching and server side html rendering

* `npm install`
* Install Memcached. On Ubuntu: `sudo apt-get install memcached` Or on OS X (with Homebrew): `brew install memcached`
* `npm run build` will build frontend an backend
* export the env vars as described below and run `node dist/build/server.bundle.js`

The demo site well be accessible under [http://localhost:8000](http://localhost:8000). 


## ENVIRONMENT VARIABLES
* NODE_ENV: development, production
* KARMA_ENDPOINT: Karma endpoint. Default https://api.karma.run
* KARMA_USER: Karma user name. Default is public
* KARMA_PWD: Public users normally don't have a Password. Default is an empty string
* KARMA_DATABASE: Karma database name
* PAGE_CACHE_EXPIRY_SECONDS: Rendered Server Side Page caching. The value determines how long a page is cached. 0 disables the cache

## TRIGGERS
* if caching is enabled open /purgecache to entirely clean the server cache

## FIXTURES
run `node tools/uploadFixtures.js` to reset the db (it import an empty db stored in dump.json) and upload the model definitions an dummy data in the fixtures folder.

