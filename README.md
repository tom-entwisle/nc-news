# NC News Back End

An API which takes data from a PSQL database and serves/recieves it on different endpoints using Express and Knex.

### Installing

To get NC News running first clone the repo and then perform the following steps:

Install Express & Knex:

```
npm i express knex pg
```

To run the test suites included you will also need Mocha, Chai & Supertest:

```
npm i -d mocha chai supertest
```

Nodemon is also used to run the server itself:

```
npm i -d nodemon
```

## Running the tests

Tests for the endpoints and utility functions are located in the spec directory. These can be run by using:

```
npm t
```

## Available Scripts

Create development and test databases:

```
npm run setup-dbs
```

Create a new migration file with Knex:

```
npm run migrate:make <filename>
```

Run the migration files:

```
npm run migrate-latest
```

Rollback the migration files:

```
npm run migrate-rollback
```

To seed the database after migration (this is done automatically before tests are ran):

```
npm run seed
```

To run the server with nodemon:

```
npm run dev
```

To run the server with node:

```
npm start
```

## Available Endpoints

Endpoints serve data from four tables: articles, topics, users and comments. Below is a list of accepted endpoints and HTTP requests which can be processed:

### Articles

```
GET /api/articles
GET /api/articles/:article_id
PATCH /api/articles/:article_id
```

### Topics

```
GET /api/topics
```

### Users

```
GET /api/users/:username
```

### Comments

```
POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
```

### Additionally, GET /api will also provide a list of available endpoints.
