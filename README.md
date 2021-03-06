# Node REST API
It's base on [NodeAPI](https://github.com/ealeksandrov/NodeAPI) ,thanks for the author.

`NodeAPI` is REST API server implementation built on top `Node.js` and `Express.js` with `Mongoose.js` for `MongoDB` integration. Access control follows `OAuth 2.0` spec with the help of `OAuth2orize` and `Passport.js`.

This is updated code that follows [RESTful API With Node.js + MongoDB](https://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb) article.


## Running project

## Manual

You need to have [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com) installed.

### Node setup on macOS

```sh
# Update Homebrew before installing all dependencies
brew update

# Install Node (+npm) with Homebrew
brew install node

# Install npm dependencies in project folder
npm install
```

### MongoDB setup on macOS

```sh
# Install MongoDB with Homebrew
brew install mongodb

# Create directory for MongoDB data
mkdir -p ./data/mongo

# Run MongoDB daemon process with path to data directory
mongod --dbpath ./data/mongo
```

### Run server

```sh
npm start
# alias for
node bin/www
```

### Create demo data

```sh
npm run-script generate
# alias for
node generateData.js
```

## Docker

You need to have [Docker](https://www.docker.com/community-edition) installed.

### Run server

```sh
docker-compose up -d --build
```

### Create demo data

```sh
docker exec nodeapi_node_api_1 node generateData.js
```

## Make Requests

Make Signup  
<img src="./img-folder/signup.jpg" width="60%" height="60%" />

Create and refresh access tokens:

```sh
http POST http://localhost:1337/api/oauth/token grant_type=password client_id=android client_secret=SomeRandomCharsAndNumbers username=myapi password=abc1234
http POST http://localhost:1337/api/oauth/token grant_type=refresh_token client_id=android client_secret=SomeRandomCharsAndNumbers refresh_token=[REFRESH_TOKEN]
```
<img src="./img-folder/token.jpg" width="60%" height="60%" />

Create your article data:

```sh
http POST http://localhost:1337/api/articles title='New Article' author='John Doe' description='Lorem ipsum dolar sit amet' images:='[{"kind":"thumbnail", "url":"http://habrahabr.ru/images/write-topic.png"}, {"kind":"detail", "url":"http://habrahabr.ru/images/write-topic.png"}]' Authorization:'Bearer ACCESS_TOKEN'
```
<img src="./img-folder/add1.jpg" width="60%" height="60%" />
<img src="./img-folder/add2.jpg" width="60%" height="60%" />

Update your article data:

```sh
http PUT http://localhost:1337/api/articles/EXISTING_ARTICLE_ID title='Updated Article' author='Jane Doe' description='This is now updated' Authorization:'Bearer ACCESS_TOKEN'
```
<img src="./img-folder/update1.jpg" width="60%" height="60%" />
<img src="./img-folder/update2.jpg" width="60%" height="60%" />

Get your data:

```sh
http http://localhost:1337/api/users/info Authorization:'Bearer ACCESS_TOKEN'
http http://localhost:1337/api/articles Authorization:'Bearer ACCESS_TOKEN'
http http://localhost:1337/api/articles/{:id} Authorization:'Bearer ACCESS_TOKEN'
```
<img src="./img-folder/articles.jpg" width="60%" height="60%" />
<img src="./img-folder/getbyid.jpg" width="60%" height="60%" />

Delete your data:
```sh
http DELETE http://localhost:1337/api/articles/{:id} Authorization:'Bearer ACCESS_TOKEN'
```
<img src="./img-folder/delete.jpg" width="60%" height="60%" />

## Tests

```sh
npm test
# alias for
node ./test/server.test.js
```

## Modules used

Some of non-standard modules used:

* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nconf](https://www.npmjs.com/package/nconf)
* [winston](https://www.npmjs.com/package/winston)
* [faker](https://www.npmjs.com/package/faker)
* [oauth2orize](https://www.npmjs.com/package/oauth2orize)
* [passport](https://www.npmjs.com/package/passport)

Test modules:

* [tape](https://www.npmjs.com/package/tape)
* [superagent](https://www.npmjs.com/package/superagent)

## Tools used

* [httpie](https://github.com/jkbr/httpie) - command line HTTP client

### JSHint

```sh
npm install jshint -g
jshint libs/**/*.js generateData.js
```
