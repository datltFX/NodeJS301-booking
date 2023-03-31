const User = require("../models/user");
exports.verify = (req, res, next) => {
  console.log("------verify.js.3-----", req.params.adminId);
  User.findById(req.params.adminId)
    .then((user) => {
      if (user.isAdmin) {
        next();
      } else {
        res.status(400).send("You are not authorized!");
      }
    })
    .catch((err) => console.log(err));
};
