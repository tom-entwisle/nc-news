# Tom Entwisle - BE Northcoders News Feedback (28/06/2019)

## General

- [ ] Write your own `README.md`. Should include:
  - Description of the project
  - A link to the **hosted version**
  - Clear instructions of how to run it locally
  - Summary of all available endpoints
- [ ] Delete any unused / our old files
- [ ] Delete any unused variables, comments, `console.log`s
- [ ] I spotted a typo (`fetchSeveralArticals`) - I use this extension to catch these: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker . It's a life-saver.
- [ ] Use object destructuring more - e.g:

```js
someRequest().then(({ body }) => {
  // stuff
});

// and
const { article_id } = req.params;
```

## Seeds

- [ ] Could insert `topicData` and `userData` at the same time (`Promise.all`) as they don't rely on one

## Testing

- [ ] Don't use real data in your utils tests.
- [ ] Don't need to `JSON.parse` in `app.spec.js`. Directly access `res.body` instead.

## Error Handling

- [ ] Use error handling middleware instead of handling them individually like this:

```js
.catch(err => {
      if (err)
        return res
          .status(400)
          .send({ msg: "Body must contain keys username and body" });
    });
```

## Controllers

- [ ] Make a JSON file representing all available endpoints and send that on `GET /api`
- [ ] Not sure what this code is doing in `updateVotes`?:

```js
if (articleData === "error")
  return next({ status: 400, msg: "must use property 'inc_votes" });
if (articleData.length === 0)
  return next({ status: 404, msg: "article not found" });
```

- [ ] `res.status(200).send({ articleData });` -> `res.status(200).send({ article });`
- [ ] When not in a promise chain already, don't `Promise.reject`, just invoke next.

```js
if (order !== "asc" && order !== "desc")
  return Promise.reject({
    status: 400,
    msg: `cannot order by ${order} only by asc and desc`
  });
```

## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### PATCH `/api/articles/1`

Assertion: expected { Object (articleData) } to contain key 'article'

Hints:

- send the updated article with a key of `article`

### PATCH `/api/articles/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/articles/1`

Assertion: Cannot read property 'votes' of undefined

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1
  Collapse

Message Input

Message Ant Medina
