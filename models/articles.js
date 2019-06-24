const connection = require("../db/connection");

const fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id);
};

const patchVotes = (article_id, votes) => {
  return connection
    .select("*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", votes)
    .returning("*");
};

const fetchSeveralArticals = queries => {
  let { sort_by = "created_at", order = "desc", author, topic } = queries;
  if (order !== "asc" && order !== "desc")
    return Promise.reject({
      status: 400,
      msg: `cannot order by ${order} only by asc and desc`
    });
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .orderBy(`articles.${sort_by}`, order)
    .returning("*");
};

module.exports = { fetchArticleById, patchVotes, fetchSeveralArticals };
