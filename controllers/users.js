const { fetchUserDataByUserName } = require("../models/users");

exports.sendUserData = (req, res, next) => {
  let username = req.params.username;
  // console.log(username);
  fetchUserDataByUserName(username)
    .then(user => {
      // console.log(user.length);
      if (user.length === 0)
        res.status(404).send({ status: 404, msg: "user not found" });
      else {
        user = user[0];
        res.status(200).send({ user });
      }
    })
    .catch(next);
};
