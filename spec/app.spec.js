process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe("/no-such-directory", () => {
    it("GET status:404 Route Not Found error handler works correctly outside of the /api route", () => {
      return request(app)
        .get("/no-such-directory")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Route Not Found");
        });
    });
  });

  describe("/api/comments OR articles OR users OR topics", () => {
    it("PATCH status:405 method not allowed when sending a patch request to /api/comments", () => {
      return request(app)
        .patch("/api/comments")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PATCH status:405 method not allowed when sending a patch request to /api/articles", () => {
      return request(app)
        .patch("/api/articles")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PATCH status:405 method not allowed when sending a patch request to /api/users", () => {
      return request(app)
        .patch("/api/users")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PATCH status:405 method not allowed when sending a patch request to /api/topics", () => {
      return request(app)
        .patch("/api/topics")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("DELETE status:405 method not allowed when sending a delete request to /api/comments", () => {
      return request(app)
        .delete("/api/comments")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("DELETE status:405 method not allowed when sending a delete request to /api/articles", () => {
      return request(app)
        .delete("/api/articles")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("DELETE status:405 method not allowed when sending a delete request to /api/users", () => {
      return request(app)
        .delete("/api/users")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("DELETE status:405 method not allowed when sending a delete request to /api/topics", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PUT status:405 method not allowed when sending a put request to /api/comments", () => {
      return request(app)
        .put("/api/comments")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PUT status:405 method not allowed when sending a put request to /api/articles", () => {
      return request(app)
        .put("/api/articles")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PUT status:405 method not allowed when sending a put request to /api/users", () => {
      return request(app)
        .put("/api/users")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    it("PUT status:405 method not allowed when sending a put request to /api/topics", () => {
      return request(app)
        .put("/api/topics")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
  });

  describe("/api/:doesnotexist", () => {
    it("GET status:404 Route Not Found error handler works correctly inside the /api directory", () => {
      return request(app)
        .get("/api/doesnotexist")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Route Not Found");
        });
    });
  });

  describe("/api/topics", () => {
    it("GET status:200 and to send an object of all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          const testTopics = JSON.parse(res.text).topics;
          expect(testTopics).to.be.an("array");
          expect(testTopics[0]).to.contain.keys(["slug", "description"]);
        });
    });
  });

  describe("/api/users/:username", () => {
    it("GET status:200 and to send an object of the user's data specified using the usename provided", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          let testUser = JSON.parse(res.text);
          expect(testUser.user).to.contain.keys([
            "username",
            "avatar_url",
            "name"
          ]);
        });
    });
  });

  describe("/api/users/:badusername", () => {
    it("GET status:404 and to send a 404 error object if the username does not exist", () => {
      return request(app)
        .get("/api/users/notarealperson")
        .expect(404)
        .then(res => {
          let testUser = JSON.parse(res.text);
          expect(testUser).to.contain.keys(["status", "msg"]);
        });
    });
  });

  describe("/api/articles/:article_id", () => {
    it("GET status:200 and to send an object of the article specified by the params", () => {
      return request(app)
        .get("/api/articles/12")
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          let article = JSON.parse(res.text);
          expect(article).to.be.an("object");
          expect(article.article).to.contain.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
        });
    });
    it("PATCH status:200 and to send an object of the article with the now updated vote property", () => {
      return request(app)
        .patch("/api/articles/6")
        .send({ inc_votes: 50 })
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          expect(res.body.articleData).to.be.an("object");
          expect(res.body.articleData).to.contain.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          ]);
          expect(res.body.articleData.votes).to.equal(50);
        });
    });
  });

  describe("/api/articles/:invalid", () => {
    it("GET status:404 and to send a 404 error object if the article does not exist", () => {
      return request(app)
        .get("/api/articles/9274621")
        .expect(404)
        .then(res => {
          let testArt = JSON.parse(res.text);
          expect(testArt).to.contain.keys(["msg"]);
        });
    });
    it("GET status:400 (bad request) and to send an object containing an error message explaining this is due to bad syntax", () => {
      return request(app)
        .get("/api/articles/green")
        .expect(400)
        .then(res => {
          const testArticleError = JSON.parse(res.text);
          expect(testArticleError.msg).to.equal(
            'invalid input syntax for integer: "green"'
          );
        });
    });
  });

  describe("/api/articles?order=:userinput", () => {
    it("GET status:200 when given a query to order the articles by descending order of date created", () => {
      return request(app)
        .get("/api/articles?order=desc")
        .expect(200)
        .then(res => {
          let testArts = JSON.parse(res.text);
          expect(testArts.articles[0].created_at).to.equal(
            "2018-11-15T12:21:54.171Z"
          );
        });
    });
    it("GET status:200 when given a query to order the articles by ascending order of date created", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(res => {
          const testArts = JSON.parse(res.text);
          expect(testArts.articles[0].created_at).to.equal(
            "1974-11-26T12:21:54.171Z"
          );
        });
    });
    it("GET status:400 when given a query to order the articles by an invalid parameter", () => {
      return request(app)
        .get("/api/articles?order=red")
        .expect(400)
        .then(res => {
          const testArtErr = JSON.parse(res.text);
          expect(testArtErr.msg).to.equal(
            "cannot order by red only by asc and desc"
          );
        });
    });
  });

  describe("/api/articles?author=mrbrown", () => {
    it("GET status:404 when using a query for an author who does not exist", () => {
      return request(app)
        .get("/api/articles?author=mrbrown")
        .expect(404)
        .then(res => {
          const testArticleError = JSON.parse(res.text);
          expect(testArticleError.msg).to.equal("No articles found :(");
        });
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    it("POST status:201 inserts a comment into the comments table", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({
          username: "butter_bridge",
          body: "test comment, please ignore"
        })
        .expect(201)
        .then(res => {
          expect(res.ok).to.equal(true);
          expect(res.body).to.be.an("object");
        });
    });
    it("GET status:200 and to send an array of objects being the comments of the article passed in the params and accpets the queries sort by and order", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          const testComments = JSON.parse(res.text).comments;
          expect(testComments).to.be.an("array");
          expect(testComments[0]).to.contain.keys([
            "author",
            "comment_id",
            "body",
            "created_at",
            "votes"
          ]);
        });
    });
  });

  describe("/api/articles", () => {
    it("GET status:200 when asked for articles without any queries returning an array of objects with the correct keys", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          const testArticle = JSON.parse(res.text).articles;
          expect(testArticle).to.be.an("array");
          expect(testArticle[0]).to.contain.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          ]);
        });
    });
    it("GET status:200 when asked for the comments of an article", () => {
      return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(res => {
          const testComments = JSON.parse(res.text).comments;
          expect(testComments).to.be.an("array");
          expect(testComments[0]).to.contain.keys([
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
        });
    });
    it("GET status:200 when asked for the comments of an article which exists but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comments).to.be.an("array");
        });
    });
    it("POST status:404 when asked to post a comment to an article that does not exist", () => {
      return request(app)
        .post("/api/articles/700/comments")
        .expect(404)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.msg).to.equal("This article does not exist");
        });
    });
  });

  describe("/api/comments/:comment_id", () => {
    it("PATCH status:200 sends back the object of the comment with the new incremented votes", () => {
      return request(app)
        .patch("/api/comments/3")
        .send({ inc_votes: 15 })
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          const testComment = JSON.parse(res.text);
          expect(testComment).to.be.an("object");
          // console.log(testComment);
        });
    });
    it("PATCH status:404 sends back an error message when attempting to add votes to a comment that does not exist", () => {
      return request(app)
        .patch("/api/comments/900")
        .send({ inc_votes: 15 })
        .expect(404)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.msg).to.equal("Invalid comment_id: 900");
        });
    });
    it("PATCH status:200 sends back an the unchanged comment object when no inc_votes key has been passed", () => {
      return request(app)
        .patch("/api/comments/3")
        .send({ internet_points: 15 })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comment).to.contain.keys([
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
        });
    });
    it("DELETE status:204 deletes the comment from the database and sends back a 204 status code as confirmation", () => {
      return request(app)
        .delete("/api/comments/12")
        .expect(204);
    });
  });
});
