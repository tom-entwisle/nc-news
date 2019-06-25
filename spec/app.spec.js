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

  describe("/api/doesnotexist", () => {
    it("GET status:404 'Route Not Found' error handler works correctly", () => {
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
        });
    });
    it("PATCH status:200 and to send an object of the article with the now updated vote property", () => {
      return request(app)
        .patch("/api/articles/6")
        .send({ inc_votes: 50 })
        .expect(200)
        .then(res => {
          expect(res.ok).to.equal(true);
          const testArticle = JSON.parse(res.text).articleData;
          expect(testArticle).to.be.an("array");
          expect(testArticle[0]).to.contain.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          ]);
          expect(testArticle[0].votes).to.equal(50);
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
          const testComment = JSON.parse(res.text);
          expect(testComment).to.be.an("object");
          // console.log(testComment);
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
    it("DELETE status:204 deletes the comment from the database and sends back a 204 status code as confirmation", () => {
      return request(app)
        .delete("/api/comments/12")
        .expect(204);
    });
  });
});
