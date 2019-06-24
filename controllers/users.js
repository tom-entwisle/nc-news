const { fetchUserDataByUserName } = require("../models/users");

exports.sendUserData = (req, res, next) => {
  username = req.params.username;
  fetchUserDataByUserName(username)
    .then(user => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "user not found" });
      else {
        user = user[0];
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
