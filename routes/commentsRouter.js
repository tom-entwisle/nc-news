const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/errors.js");
const {
  incVotesForComment,
  removeComment
} = require("../controllers/comments");

commentsRouter.route("/").all(methodNotAllowed);

commentsRouter
  .route("/:comment_id")
  .patch(incVotesForComment)
  .delete(removeComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
