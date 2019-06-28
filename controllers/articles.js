"use strict";
const {
  fetchArticleById,
  patchVotes,
  fetchSeveralArticals,
  checkExists
} = require("../models/articles");

exports.sendArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchArticleById(article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      article = article[0];
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendMultipleArticles = (req, res, next) => {
  const { topic, author } = req.query;
  fetchSeveralArticals(req.query)
    .then(articles => {
      const topicExists = topic ? checkExists(topic, "topics", "slug") : null;
      const authorExists = author
        ? checkExists(author, "users", "username")
        : null;
      return Promise.all([topicExists, authorExists, articles]);
    })
    .then(([topicExists, authorExists, articles]) => {
      if (topicExists === false || authorExists === false)
        return Promise.reject({ status: 404, msg: "No articles found :(" });
      else res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateVotes = (req, res, next) => {
  let article_id = req.params.article_id;
  let votes = req.body.inc_votes;
  if (votes === undefined) votes = 0;
  patchVotes(article_id, votes)
    .then(articleData => {
      if (articleData === "error")
        return next({ status: 400, msg: "must use property 'inc_votes" });
      if (articleData.length === 0)
        return next({ status: 404, msg: "article not found" });
      articleData = articleData[0];
      res.status(200).send({ articleData });
    })
    .catch(next);
};

// exports.sendMultipleArticles = (req, res, next) => {
//   const queries = req.query;
//   fetchSeveralArticals(queries)
//     .then(articles => {
//       if (articles.length === 0)
//         return Promise.reject({
//           status: 404,
//           msg: "No articles found :("
//         });
//       res.status(200).send({ articles });
//     })
//     .catch(next);
// };
