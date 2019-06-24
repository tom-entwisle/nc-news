const connection = require("../db/connection");

const fetchUserDataByUserName = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username);
};

module.exports = { fetchUserDataByUserName };
