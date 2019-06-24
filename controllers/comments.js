const {
  postCommentToArticle,
  fetchCommentsByArticle,
  incrementVotes,
  deleteComment
} = require("../models/comments");

exports.postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const userInput = req.body;
  postCommentToArticle(article_id, userInput)
    .then(comment => res.status(201).send({ comment }))
    .catch(err => {
      if (err)
        return res
          .status(400)
          .send({ msg: "Body must contain keys username and body" });
    });
};

exports.sendCommentsByArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  const queries = req.query;
  fetchCommentsByArticle(article_id, queries)
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({
          status: 404,
          msg: "Article or comments do not exist"
        });
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.incVotesForComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  const votes = req.body.inc_votes;
  if (votes === undefined) votes = 0;
  incrementVotes(comment_id, votes)
    .then(comment => res.status(200).send({ comment }))
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  deleteComment(comment_id)
    .then(delCount => {
      if (delCount === 1) res.sendStatus(204);
      else if (delCount === 0)
        return Promise.reject({ status: 404, msg: "comment not found" });
    })
    .catch(next);
};
