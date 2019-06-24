const express = require("express");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handle500,
  psqlErrors,
  noContent
} = require("./errors/errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handle500);

app.use(psqlErrors);

app.use(noContent);

module.exports = app;
