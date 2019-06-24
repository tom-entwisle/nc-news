const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/errors.js");
const {
  sendArticle,
  updateVotes,
  sendMultipleArticles
} = require("../controllers/articles");
const {
  postComment,
  sendCommentsByArticle
} = require("../controllers/comments");

articlesRouter
  .route("/")
  .get(sendMultipleArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(updateVotes)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(sendCommentsByArticle)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
