const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors/errors.js");
const usersRouter = require("./usersRouter");
const commentsRouter = require("./commentsRouter");
const topicsRouter = require("./topicsRouter");
const articlesRouter = require("./articlesRouter");
const endpointsJSON = require("../endpointsJSON");

apiRouter
  .route("/")
  .get((req, res) => res.send({ endpointsJSON }))
  .all(methodNotAllowed);

apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
