## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

### POST `/api/articles/10000/comments`

Assertion: expected 201 to be one of [ 404, 422 ]

Hints:

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

### PATCH `/api/comments/1`

Assertion: expected 500 to equal 200

Hints:

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body

### PATCH `/api/comments/1000`

Assertion: expected 200 to equal 404

Hints:

- use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist
