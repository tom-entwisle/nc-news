"use strict";
const {
  fetchArticleById,
  patchVotes,
  fetchSeveralArticals
} = require("../models/articles");

exports.sendArticle = (req, res, next) => {
  const article_id = req.params.article_id;
  fetchArticleById(article_id)
    .then(article => {
      if (article.length === 0) {
        res.status(404).send({ status: 404, msg: "article not found" });
      }
      res.status(200).send({ article });
    })
    .catch(next);
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
      res.status(200).send({ articleData });
    })
    .catch(next);
};

exports.sendMultipleArticles = (req, res, next) => {
  const queries = req.query;
  fetchSeveralArticals(queries)
    .then(articles => {
      // console.log(articles);
      if (articles.length === 0)
        res.status(404).send({
          status: 404,
          msg: "No articles found"
        });
      res.status(200).send({ articles });
    })
    .catch(next);
};
