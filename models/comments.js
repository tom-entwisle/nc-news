const connection = require("../db/connection");

const postCommentToArticle = (article_id, userInput) => {
  const commentToInsert = { ...userInput };
  commentToInsert.article_id = article_id;
  commentToInsert.author = commentToInsert.username;
  delete commentToInsert.username;
  return connection
    .insert(commentToInsert)
    .into("comments")
    .returning("*");
};

const fetchCommentsByArticle = (article_id, queries) => {
  const { sort_by = "created_at", order = "desc" } = queries;
  if (order !== "asc" && order !== "desc")
    return Promise.reject({
      status: 400,
      msg: `cannot order by ${order} only by asc and desc`
    });
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .returning("*");
};

const incrementVotes = (comment_id, votes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .increment("votes", votes)
    .returning("*");
};

const deleteComment = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .del();
};

module.exports = {
  postCommentToArticle,
  fetchCommentsByArticle,
  incrementVotes,
  deleteComment
};
