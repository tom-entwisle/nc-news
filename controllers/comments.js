const {
  postCommentToArticle,
  fetchCommentsByArticle,
  incrementVotes,
  deleteComment
} = require("../models/comments");

const { checkExists } = require("../models/articles");

const { fetchArticleById } = require("../models/articles");

exports.postComment = (req, res, next) => {
  const article_id = req.params.article_id;
  const userInput = req.body;
  fetchArticleById(article_id)
    .then(articleData => {
      if (articleData.length === 0)
        return Promise.reject({
          status: 404,
          msg: "This article does not exist"
        });
      postCommentToArticle(article_id, userInput)
        .then(([comment]) => res.status(201).send({ comment }))
        .catch(err => {
          if (err)
            return res
              .status(400)
              .send({ msg: "Body must contain keys username and body" });
        });
    })
    .catch(next);
};

// exports.sendCommentsByArticle = (req, res, next) => {
//   const article_id = req.params.article_id;
//   const queries = req.query;
//   fetchCommentsByArticle(article_id, queries)
//     .then(comments => {
//       if (comments.length === 0)
//         return Promise.reject({
//           status: 404,
//           msg: "Article or comments do not exist"
//         });
//       res.status(200).send({ comments });
//     })
//     .catch(next);
// };

exports.sendCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticle(article_id, req.query)
    .then(comments => {
      const articleExists = article_id
        ? checkExists(article_id, "articles", "article_id")
        : null;
      return Promise.all([articleExists, comments]);
    })
    .then(([articleExists, comments]) => {
      console.log(articleExists);
      if (articleExists === false)
        return Promise.reject({
          status: 404,
          msg: `Invalid article_id: ${article_id}`
        });
      else res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.incVotesForComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  incrementVotes(comment_id, inc_votes)
    .then(comment => {
      if (!comment)
        return Promise.reject({
          status: 404,
          msg: `Invalid comment_id: ${comment_id}`
        });
      res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
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
