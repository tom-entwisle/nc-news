exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.psqlErrors = (err, req, res, next) => {
  const psqlCodes = ["42703", "42702", "23503", "22P02"];
  if (psqlCodes.includes(err.code))
    res.status(400).send({ msg: err.message.split(" - ")[1] || "Bad Request" });
  else next(err);
};

exports.noContent = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: err.msg });
  else res.status(err.status).send({ msg: err.msg });
};
